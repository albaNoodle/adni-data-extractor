import { Module } from '@nestjs/common';
import { AdniImagesModule } from 'src/adni-images/adni-images.module';
import { AdniReaderController } from './adni-reader.controller';
import { AdniReaderService } from './adni-reader.service';

@Module({
  imports: [AdniImagesModule],
  controllers: [AdniReaderController],
  providers: [AdniReaderService]
})
export class AdniReaderModule {}
