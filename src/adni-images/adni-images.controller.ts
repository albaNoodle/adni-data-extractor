import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdniImage } from '../entities/adni-image.entity';
import { AdniImagesService } from './adni-images.service';
import { AvatarFileInterceptor } from './avatar-file.interceptor';
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

  @Post('/path')
  @ApiOperation({ summary: 'Generates ADNI images on database from a .csv file' })
  async loadAdniImages(@Body() adniImagesLoadInDto: AdniImagesLoadInDto): Promise<AdniImage[]> {
    return this.adniImagesService.loadAdniImages(adniImagesLoadInDto);
  }

  @Post()
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(AvatarFileInterceptor('file'))
  @ApiOperation({ summary: 'Generates ADNI images on database from a .csv file' })
  async loadCsvAdniImages(@UploadedFile('file') file): Promise<AdniImage[]> {
    const adniImagesLoadInDto: AdniImagesLoadInDto = { path: file.path };
    return this.adniImagesService.loadAdniImages(adniImagesLoadInDto);
  }

  @Get()
  @ApiOperation({ summary: 'Generates ADNI images on database from a .csv file' })
  async lgetAdniImages(@Query() adniImagesFilterDto: AdniImagesFilterDto): Promise<AdniImage[]> {
    return this.adniImagesService.getAdniImages(adniImagesFilterDto);
  }
}
