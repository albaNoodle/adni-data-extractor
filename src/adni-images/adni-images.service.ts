import { Injectable } from '@nestjs/common';
import { AdniImage } from 'src/entities/adni-image.entity';
import { AdniImagesLoadInDto } from './dto/adni-images.load.in.dto';
import * as fs from 'fs';
import { join } from 'path';

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
            console.log(row.size)
            console.log(row[0])
            // use row data
        })
    
        .on('end', () => {
            // handle end of CSV
        })
        return null;
    }
}
