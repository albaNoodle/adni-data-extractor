import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BrainPart } from 'src/entities/brain-part.entity';
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

  @Post()
  @ApiOperation({ summary: 'Load ADNI dictionary' })
  async loadAdniDictionary(@Body() adniDictionaryLoadInDto: AdniDictionaryLoadInDto): Promise<BrainPart[]> {
    return this.adniDictionaryService.loadAdniDictionary(adniDictionaryLoadInDto.path);
  }

  @Get()
  @ApiOperation({ summary: 'Get a listr of available brain parts for getting their volumes' })
  async getBrainParts(@Query() brainPartFilerDto: BrainPartFilterDto): Promise<BrainPart[]> {
    return this.adniDictionaryService.getBrainParts(brainPartFilerDto);
  }
}
