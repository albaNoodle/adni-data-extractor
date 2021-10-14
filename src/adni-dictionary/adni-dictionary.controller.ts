import { Body, ClassSerializerInterceptor, Controller, Inject, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BrainPart } from 'src/entities/brain-part.entity';
import { AdniDictionaryService } from './adni-dictionary.service';

@Controller('adni-dictionary')
@ApiTags('Adni dictionary')
@UseInterceptors(ClassSerializerInterceptor)
export class AdniDictionaryController {
    constructor(
        @Inject(AdniDictionaryService)
        private adniDictionaryService: AdniDictionaryService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Load ADNI dictionary' })
    async loadAdniImages(
        // @Body() adniDictionaryLoadInDto: AdniDictionaryLoadInDto
        ): Promise<BrainPart[]> {
        return this.adniDictionaryService.loadAdniDictionary(
            // adniImagesLoadInDto
        );
    }
}
