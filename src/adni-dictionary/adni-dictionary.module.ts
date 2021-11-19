import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdniDictionaryController } from './adni-dictionary.controller';
import { AdniDictionaryService } from './adni-dictionary.service';
import { BrainPartRepository } from './brain-part.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BrainPartRepository])],
  controllers: [AdniDictionaryController],
  providers: [AdniDictionaryService],
  exports: [AdniDictionaryService]
})
export class AdniDictionaryModule {}
