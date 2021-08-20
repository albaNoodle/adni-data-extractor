import { Injectable } from '@nestjs/common';
import { AdniImage } from 'src/entities/adni-image.entity';
import { AdniImagesLoadInDto } from './dto/adni-images.load.in.dto';
import * as fs from 'fs';
import { join } from 'path';
import { AdniImageCreateDto } from './dto/adni-image.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdniImageRepository } from './adni-image.repository';
import { from } from 'rxjs';
import { PhenotypeRepository } from './phenotype.repository';
import { PhenotypeCreateDto } from './dto/phenotype.create.dto';


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
    'RHIPQC'
]
@Injectable()
export class AdniImagesService {
    constructor(
        @InjectRepository(AdniImageRepository)
        private adniImageRepository: AdniImageRepository,

        @InjectRepository(PhenotypeRepository)
        private phenotypeRepository: PhenotypeRepository,
    ) {}

    async loadAdniImages(adniImagesLoadInDto: AdniImagesLoadInDto): Promise<AdniImage[]>{
        const adniImages: Promise<AdniImage>[] = [];
        const csvParser = require('csv-parser');
        console.log(__dirname)
        let dirname = __dirname;
        const distIdx = dirname.indexOf('/dist'); 
        if(distIdx > 0) {
            dirname = dirname.substring(distIdx, -1);
        }
        console.log(dirname)
        const stream = fs.createReadStream(join(dirname,'data','test','phenotypes.csv')).pipe(csvParser())
        .on('data', async (row) => {
            console.log(row)
            console.log(typeof row['LONISID'])
            console.log(row.length)
            // use row data

            //Create the image
            const createAdniImage: AdniImageCreateDto = {
                visCode:row['VISCODE'],
                patientId: row['RID'],
                examDate: row['EXAMDATE'],
                imageUid: row['IMAGEUID']
            }
            const adniImage = await this.adniImageRepository.createAdniImage(createAdniImage);

            //Create the fenotypes assosiated with the image (from position 22 till semipenultima)
            const keys = Object.keys( row );
            const phenotypesDtos: PhenotypeCreateDto[] = []
            for( let i = 22; i < keys.length-1; i++ ) {
                const createPhenotypeDto: PhenotypeCreateDto = {
                    imageUid: row['IMAGEUID'], 
                    brainPartKey: keys[i],
                    value: row[keys[i]]
                }
                console.log(createPhenotypeDto);
                phenotypesDtos.push(createPhenotypeDto);
            }

            await Promise.all(
                phenotypesDtos.map(async(phenotype) => this.phenotypeRepository.createPhenotype(phenotype))
            );
        })
    
        .on('end', () => {
            fs.close;
            // handle end of CSV
        })
        return null;
    }
}
