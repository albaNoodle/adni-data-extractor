import { Injectable } from '@nestjs/common';
import { AdniImage } from '../entities/adni-image.entity';
import { AdniImagesLoadInDto } from './dto/adni-images.load.in.dto';
import * as fs from 'fs';
import { AdniImageCreateDto } from './dto/adni-image.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdniImageRepository } from './adni-image.repository';
import { PhenotypeRepository } from './phenotype.repository';
import { PhenotypeCreateDto } from './dto/phenotype.create.dto';
import { In } from 'typeorm';

const NOT_FENOTYPE_FIELDS = [
  'COLPROT',
  'RID',
  'VISCODE',
  'VISCODE2',
  'EXAMDATE',
  'VERSION',
  'LONISID',
  'LONIUID',
  'IMAGEUID',
  'RUNDATE',
  'STATUS',
  'OVERALLQC',
  'TEMPQC',
  'FRONTQC',
  'PARQC',
  'INSULAQC',
  'OCCQC',
  'BGQC',
  'CWMQC',
  'VENTQC',
  'LHIPQC',
  'RHIPQC',
];
@Injectable()
export class AdniImagesService {
  constructor(
    @InjectRepository(AdniImageRepository)
    private adniImageRepository: AdniImageRepository,

    @InjectRepository(PhenotypeRepository)
    private phenotypeRepository: PhenotypeRepository
  ) {}

  async loadAdniImages(adniImagesLoadInDto: AdniImagesLoadInDto): Promise<AdniImage[]> {
    const adniImages: Promise<AdniImage>[] = [];
    const csvParser = require('csv-parser');
    let dirname = __dirname;
    const distIdx = dirname.indexOf('/dist');
    if (distIdx > 0) {
      dirname = dirname.substring(distIdx, -1);
    }
    const stream = fs
      .createReadStream(
        // join(dirname, 'data', 'test', 'phenotypes.csv')
        adniImagesLoadInDto.path
      )
      .pipe(csvParser())
      .on('end', () => {
        fs.close;
        // handle end of CSV
      });

    const adniImagesToProcess: AdniImageCreateDto[] = [];
    const phenotypesToProcess: PhenotypeCreateDto[] = [];

    for await (const row of stream) {
      const createAdniImage: AdniImageCreateDto = {
        visCode: row['VISCODE'],
        rid: row['RID'],
        examDate: row['EXAMDATE'],
        imageUid: row['IMAGEUID'],
      };
      adniImagesToProcess.push(createAdniImage);

      //Create the fenotypes assosiated with the image (from position 22 till semipenultima)
      const keys = Object.keys(row);
      for (let i = 22; i < keys.length - 1; i++) {
        const createPhenotypeDto: PhenotypeCreateDto = {
          imageUid: row['IMAGEUID'],
          brainPartKeyname: keys[i],
          value: row[keys[i]],
        };
        phenotypesToProcess.push(createPhenotypeDto);
      }
    }

    // Get images imageUid of the csv images
    const imagesUid = adniImagesToProcess.map((x) => x.imageUid);

    // Get images imageUid that are already on the database
    const adniImagesExisting = await this.adniImageRepository.find({ where: { imageUid: In(imagesUid) } });
    const adniImagesToCreate = adniImagesToProcess.filter(
      (x) => !adniImagesExisting.map((ai) => ai.imageUid.toString()).includes(x.imageUid.toString())
    );
    const adniImagesToUpdate = adniImagesToProcess.filter((x) =>
      adniImagesExisting.map((ai) => ai.imageUid.toString()).includes(x.imageUid.toString())
    );

    const imagesCreated = await Promise.all(
      adniImagesToCreate.map(async (createAdniImage) => {
        const image = await this.adniImageRepository.createAdniImage(createAdniImage);

        // Created phenotypes
        const imagePhenotypes = phenotypesToProcess.filter((pheno) => pheno.imageUid === createAdniImage.imageUid);
        await Promise.all(
          imagePhenotypes.map(async (phenotype) => {
            return await this.phenotypeRepository.createPhenotype(phenotype);
          })
        );
        return image;
      })
    );

    const imagesUpdated = await Promise.all(
      adniImagesToUpdate.map(async (updateAdniImage) => {
        const image = await this.adniImageRepository.updateAdniImage(updateAdniImage);

        // Updated or created phenotypes
        const imagePhenotypes = phenotypesToProcess.filter((pheno) => pheno.imageUid === updateAdniImage.imageUid);

        await this.phenotypeRepository.createOrUpdatePhenotypes(imagePhenotypes);
        return image;
      })
    );

    return null;
  }
}
