import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { join } from 'path';
import { AdniReaderService } from './adni-reader.service';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { AdniReaderInDto } from 'src/adni-images/dto/adni-reader.in.dto';

@Controller('adni-reader')
@ApiTags('Adni reader')
@UseInterceptors(ClassSerializerInterceptor)
export class AdniReaderController {
  constructor(
    @Inject(AdniReaderService)
    private adniReaderService: AdniReaderService
  ) {}

  // @Get()
  // @ApiOperation({ summary: 'Get phenotypes' })
  // async readCsv(@Query() optionsDto: OptionsInDto): Promise<File> {
  //   const csvParser = require('csv-parser');
  //   let dirname = __dirname;
  //   const distIdx = dirname.indexOf('/dist');
  //   if (distIdx > 0) {
  //     dirname = dirname.substring(distIdx, -1);
  //   }
  //   const stream = fs
  //     .createReadStream(join(dirname, 'data', 'test', 'patients.csv'))
  //     .pipe(csvParser())
  //     .on('data', (row) => {
  //       // console.log(row)
  //       // use row data
  //     })

  //     .on('end', () => {
  //       // handle end of CSV
  //     });
  //   return null;
  // }

  @Post()
  @ApiOperation({ summary: 'Get phenotypes' })
  async getPhenotypesCsv(
    // @Query() adniReportDto: AdniReportDto,
    @Body() adniReaderInDto: AdniReaderInDto,
    @Res() res: Response
  ) {
    console.log(adniReaderInDto.patientsPtids.length);
    const filePath = await this.adniReaderService.getPhenotypesCsv(adniReaderInDto);
    const file = createReadStream(join(process.cwd(), filePath));

    // TODO: use https://docs.nestjs.com/techniques/streaming-files in nest +8.0
    // const { fileName } = adniReaderInDto;
    // const filename = path ? join(path, name) : name;
    const finalFile = new StreamableFile(file);
    // res.set({
    //   'Content-Type': 'text/csv',
    //   'Content-Disposition': `attachment; filename="${
    //     fileName ? fileName : new Date().getTime()
    //   }.csv"`,
    //   'Access-Control-Expose-Headers': 'Content-Disposition',
    // });
    res.header({ 'Content-Type': 'text/csv' });
    res.header({
      'Content-Disposition': `attachment; filename="${new Date().getTime()}.csv"`,
    });
    res.header({ 'Access-Control-Expose-Headers': 'Content-Disposition' });

    finalFile.getStream().pipe(res);
  }
}
