import { Injectable } from '@nestjs/common';
import { AdniImage } from '../entities/adni-image.entity';
import { AdniImagesLoadInDto } from './dto/adni-images.load.in.dto';
import * as fs from 'fs';
import { AdniImageCreateDto } from './dto/adni-image.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdniImageRepository } from './adni-image.repository';
import { PhenotypeRepository } from './phenotype.repository';
import { PhenotypeCreateDto } from './dto/phenotype.create.dto';
import { AdniImagesFilterDto } from './dto/adni-images.filter.dto';

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
    let keys;
    for await (const row of stream) {
      if (row['IMAGEUID'] && row['IMAGEUID'].length > 0) {
        const createAdniImage: AdniImageCreateDto = {
          imageUid: row['IMAGEUID'],
          rid: row['RID'],
          visCode: row['VISCODE'],
          examDate: row['EXAMDATE'],
        };
        adniImagesToProcess.push(createAdniImage);

        //Create the fenotypes assosiated with the image (from position 22 till semipenultima)
        if (!keys) {
          keys = Object.keys(row);
        }

        // Standard image file or adnimerge file
        let i = keys.indexOf('IMAGEUID') !== 8 ? keys.indexOf('IMAGEUID') + 1 : 22;

        for (i; i < keys.length - 1; i++) {
          const value = row[keys[i]];
          if (!isNaN(value)) {
            const createPhenotypeDto: PhenotypeCreateDto = {
              imageUid: row['IMAGEUID'],
              brainPartKeyname: keys[i],
              value: value ? value : -1,
            };
            // console.log(createPhenotypeDto);
            phenotypesToProcess.push(createPhenotypeDto);
          }
        }
      }
    }

    await this.adniImageRepository.createOrUpdateAdniImages(adniImagesToProcess);
    await this.phenotypeRepository.createOrUpdatePhenotypes(phenotypesToProcess);

    return null;
  }

  async getAdniImages(adniImagesFilterDto: AdniImagesFilterDto): Promise<AdniImage[]> {
    return this.adniImageRepository.getAdniImages(adniImagesFilterDto);
  }
}
