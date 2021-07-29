import { Injectable } from '@nestjs/common';
import { AdniImage } from 'src/entities/adni-image.entity';
import { AdniImagesLoadInDto } from './dto/adni-images.load.in.dto';
import * as fs from 'fs';
import { join } from 'path';


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
        .on('data', (row) => {
            console.log(row)
            console.log(typeof row['LONISID'])
            // use row data

            //Create the image

            //Create the fenotypes assosiated with the image
        })
    
        .on('end', () => {
            fs.close;
            // handle end of CSV
        })
        return null;
    }
}
