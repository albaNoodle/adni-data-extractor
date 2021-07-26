import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { AdniReaderController } from './adni-reader.controller';

@Module({
  imports: [CsvModule],
  controllers: [AdniReaderController]
})
export class AdniReaderModule {}
