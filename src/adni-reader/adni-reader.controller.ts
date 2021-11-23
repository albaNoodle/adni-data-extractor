import { ClassSerializerInterceptor, Controller, Get, Inject, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OptionsInDto } from '../dtos/options.in.dto';
import * as fs from 'fs';
import { join } from 'path';
import { AdniImagesFilterDto } from 'src/adni-images/dto/adni-images.filter.dto';
import { AdniReaderService } from './adni-reader.service';

@Controller('adni-reader')
@ApiTags('Adni reader')
@UseInterceptors(ClassSerializerInterceptor)
export class AdniReaderController {
  constructor(
    @Inject(AdniReaderService)
    private adniReaderService: AdniReaderService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get phenotypes' })
  async readCsv(@Query() optionsDto: OptionsInDto): Promise<File> {
    const csvParser = require('csv-parser');
    let dirname = __dirname;
    const distIdx = dirname.indexOf('/dist');
    if (distIdx > 0) {
      dirname = dirname.substring(distIdx, -1);
    }
    const stream = fs
      .createReadStream(join(dirname, 'data', 'test', 'patients.csv'))
      .pipe(csvParser())
      .on('data', (row) => {
        // console.log(row)
        // use row data
      })

      .on('end', () => {
        // handle end of CSV
      });
    return null;
  }

  @Post()
  @ApiOperation({ summary: 'Get phenotypes' })
  async getPhenotypesCsv(@Query() adniImagesFilterDto: AdniImagesFilterDto): Promise<File> {
    return this.adniReaderService.getPhenotypesCsv(adniImagesFilterDto);
  }
}
