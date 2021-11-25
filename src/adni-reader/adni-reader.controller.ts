import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Query, Res, StreamableFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OptionsInDto } from '../dtos/options.in.dto';
import * as fs from 'fs';
import { join } from 'path';
import { AdniImagesFilterDto } from 'src/adni-images/dto/adni-images.filter.dto';
import { AdniReaderService } from './adni-reader.service';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { AdniReportDto } from './dto/adni-report.dto';

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
  async getPhenotypesCsv(
    @Body() adniReportDto: AdniReportDto,
    @Query() adniImagesFilterDto: AdniImagesFilterDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<StreamableFile> {
    const filePath = await this.adniReaderService.getPhenotypesCsv(adniImagesFilterDto);
    const file = createReadStream(join(process.cwd(), filePath));

    // TODO: use https://docs.nestjs.com/techniques/streaming-files in nest +8.0
    const { name, path } = adniReportDto;
    // const filename = path ? join(path, name) : name;
    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${name}.csv"`,
      'Access-Control-Expose-Headers': 'Content-Disposition',
    });
    return new StreamableFile(file);
  }
}
