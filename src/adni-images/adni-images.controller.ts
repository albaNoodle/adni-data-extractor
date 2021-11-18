import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdniImage } from '../entities/adni-image.entity';
import { AdniImagesService } from './adni-images.service';
import { AdniImagesFilterDto } from './dto/adni-images.filter.dto';
import { AdniImagesLoadInDto } from './dto/adni-images.load.in.dto';

@Controller('adni-images')
@ApiTags('Adni images')
@UseInterceptors(ClassSerializerInterceptor)
export class AdniImagesController {
  constructor(
    @Inject(AdniImagesService)
    private adniImagesService: AdniImagesService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Generates ADNI images on database from a .csv file' })
  async loadAdniImages(@Body() adniImagesLoadInDto: AdniImagesLoadInDto): Promise<AdniImage[]> {
    return this.adniImagesService.loadAdniImages(adniImagesLoadInDto);
  }

  @Get()
  @ApiOperation({ summary: 'Generates ADNI images on database from a .csv file' })
  async lgetAdniImages(@Query() adniImagesFilterDto: AdniImagesFilterDto): Promise<AdniImage[]> {
    return this.adniImagesService.getAdniImages(adniImagesFilterDto);
  }
}
