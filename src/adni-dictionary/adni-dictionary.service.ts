import { Injectable } from '@nestjs/common';
import { BrainPart } from 'src/entities/brain-part.entity';
import * as fs from 'fs';
import { join } from 'path';
import { BrainPartCreateDto } from './dto/brain-part.create.dto';
import { In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BrainPartRepository } from './brain-part.repository';
import { BrainPartFilterDto } from './dto/brain-part.filter.dto';

const MAX_LENGTH = 256;

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
        humanName: this.proccessHumanName(row['TEXT']),
        dictionary: row['TBLNAME'],
      };
      adniBrainPartsToProcess.push(createAdniImage);
    }

    await this.brainPartRepository.createOrUpdatePhenotypes(adniBrainPartsToProcess);

    return null;
  }

  async getBrainParts(brainPartFilerDto: BrainPartFilterDto): Promise<BrainPart[]> {
    return this.brainPartRepository.getBrainParts(brainPartFilerDto);
  }

  // ------ Utils -------

  // Process human name to avoid atring values longer than allowed on database
  private proccessHumanName(humanName: string): string {
    let finalName = humanName.length <= MAX_LENGTH ? humanName : humanName.split('.')[0];
    finalName = finalName.length <= MAX_LENGTH ? finalName : finalName.substring(0, MAX_LENGTH - 1);
    return finalName;
  }
}
