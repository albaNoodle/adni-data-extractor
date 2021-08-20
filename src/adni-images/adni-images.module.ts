import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdniImagesController } from './adni-images.controller';
import { AdniImageRepository } from './adni-image.repository';
import { AdniImagesService } from './adni-images.service';
import { PhenotypeRepository } from './phenotype.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdniImageRepository, PhenotypeRepository])],
  controllers: [AdniImagesController],
  providers: [AdniImagesService]
})
export class AdniImagesModule {}
