import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Diagnosis } from '../../enums/diagnosis.enum';

export class BrainPartFilterDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'UCSFFSL51ALL',
    description: 'Dictionary name for getting its brain parts',
  })
  dictionary?: string;
}
