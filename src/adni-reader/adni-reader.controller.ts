import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OptionsInDto } from 'src/dtos/options.in.dto';
import * as fs from 'fs';
import { join } from 'path';

@Controller('adni-reader')
@ApiTags('Adni reader')
@UseInterceptors(ClassSerializerInterceptor)
export class AdniReaderController {
    constructor(
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get phenotypes' })
    async readCsv(@Query() optionsDto: OptionsInDto): Promise<File> {
        const csvParser = require('csv-parser');
        console.log(__dirname)
        let dirname = __dirname;
        const distIdx = dirname.indexOf('/dist'); 
        if(distIdx > 0) {
            dirname = dirname.substring(distIdx, -1);
        }
        console.log(dirname)
        const stream = fs.createReadStream(join(dirname,'data','test','patients.csv')).pipe(csvParser())
        .on('data', (row) => {
            // console.log(row)
            // use row data
        })
    
        .on('end', () => {
            // handle end of CSV
        })
    return null;
    }
   
}
