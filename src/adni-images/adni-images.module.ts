import { Module } from '@nestjs/common';
import { AdniImagesController } from './adni-images.controller';
import { AdniImagesService } from './adni-images.service';

@Module({
  imports: [],
  controllers: [AdniImagesController],
  providers: [AdniImagesService]
})
export class AdniImagesModule {}
