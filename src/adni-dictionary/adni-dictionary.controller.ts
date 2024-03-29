import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BrainPart } from 'src/entities/brain-part.entity';
import { AdniFileInterceptor } from 'src/interceptors/adni-file.interceptor';
import { AdniDictionaryService } from './adni-dictionary.service';
import { AdniDictionaryLoadInDto } from './dto/adni-dictionary.load.in.dto';
import { BrainPartFilterDto } from './dto/brain-part.filter.dto';

@Controller('adni-dictionaries')
@ApiTags('Adni dictionaries')
@UseInterceptors(ClassSerializerInterceptor)
export class AdniDictionaryController {
  constructor(
    @Inject(AdniDictionaryService)
    private adniDictionaryService: AdniDictionaryService
  ) {}

  @Post('/path')
  @ApiOperation({ summary: 'Load ADNI dictionary' })
  async loadAdniDictionary(@Body() adniDictionaryLoadInDto: AdniDictionaryLoadInDto): Promise<BrainPart[]> {
    return this.adniDictionaryService.loadAdniDictionary(adniDictionaryLoadInDto.path);
  }

  @Post()
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(AdniFileInterceptor('file'))
  @ApiOperation({ summary: 'Generates ADNI brain parts from the dictionary .csv file' })
  async loadCsvAdniImages(@UploadedFile('file') file): Promise<BrainPart[]> {
    const adniDictionaryLoadInDto: AdniDictionaryLoadInDto = { path: file.path };
    return this.adniDictionaryService.loadAdniDictionary(adniDictionaryLoadInDto.path);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of available brain parts for getting their volumes' })
  async getBrainParts(@Query() brainPartFilerDto: BrainPartFilterDto): Promise<BrainPart[]> {
    return this.adniDictionaryService.getBrainParts(brainPartFilerDto);
  }
}
