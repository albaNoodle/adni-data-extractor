import { Injectable } from '@nestjs/common';
import { BrainPart } from 'src/entities/brain-part.entity';
import * as fs from 'fs';
import { join } from 'path';
import { BrainPartCreateDto } from './dto/brain-part.create.dto';
import { In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BrainPartRepository } from './brain-part.repository';
import { BrainPartFilterDto } from './dto/brain-part.filter.dto';

@Injectable()
export class AdniDictionaryService {
  constructor(
    @InjectRepository(BrainPartRepository)
    private brainPartRepository: BrainPartRepository
  ) {}

  async loadAdniDictionary(path: string): Promise<BrainPart[]> {
    const adniBrainParts: Promise<BrainPart>[] = [];
    const csvParser = require('csv-parser');
    let dirname = __dirname;
    const distIdx = dirname.indexOf('/dist');
    if (distIdx > 0) {
      dirname = dirname.substring(distIdx, -1);
    }
    const stream = fs
      .createReadStream(
        path
        // '/home/alba/projects/adni-data-extractor/data/test/dictionary.csv'
        // join(dirname, 'data', 'test', 'dictionary.csv')
      )
      .pipe(csvParser())
      .on('end', () => {
        fs.close;
        // handle end of CSV
      });

    const adniBrainPartsToProcess: BrainPartCreateDto[] = [];

    for await (const row of stream) {
      const createAdniImage: BrainPartCreateDto = {
        keyname: row['FLDNAME'],
        humanName: row['TEXT'],
        dictionary: row['TBLNAME'],
      };
      adniBrainPartsToProcess.push(createAdniImage);
    }

    // Get images imageUid of the csv images
    const brainPartsKeynames = adniBrainPartsToProcess.map((x) => x.keyname);

    // Get images imageUid that are already on the database
    const adniBrainPartsExisting = await this.brainPartRepository.find({ where: { keyname: In(brainPartsKeynames) } });
    const adniBrainPartsToCreate = adniBrainPartsToProcess.filter(
      (x) => !adniBrainPartsExisting.map((ai) => `${ai.keyname}-${ai.dictionary}`).includes(`${x.keyname}-${x.dictionary}`)
    );
    const adniBrainPartsToUpdate = adniBrainPartsToProcess.filter((x) =>
      adniBrainPartsExisting.map((ai) => `${ai.keyname}-${ai.dictionary}`).includes(`${x.keyname}-${x.dictionary}`)
    );
    const imagesCreated = await Promise.all(
      adniBrainPartsToCreate.map(async (createAdniImage) => {
        const image = await this.brainPartRepository.createBrainPart(createAdniImage);
        return image;
      })
    );

    const imagesUpdated = await Promise.all(
      adniBrainPartsToUpdate.map(async (updateAdniImage) => {
        const image = await this.brainPartRepository.updateBrainPart(updateAdniImage);
        return image;
      })
    );

    return null;
  }

  async getBrainParts(brainPartFilerDto: BrainPartFilterDto ): Promise<BrainPart[]> {
    return this.brainPartRepository.getBrainParts(brainPartFilerDto);
  }
}
