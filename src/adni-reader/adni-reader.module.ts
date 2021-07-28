import { Module } from '@nestjs/common';
import { AdniReaderController } from './adni-reader.controller';

@Module({
  imports: [],
  controllers: [AdniReaderController]
})
export class AdniReaderModule {}
