import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf, ValidateNested } from 'class-validator';
import { Diagnosis } from 'src/enums/diagnosis.enum';
import { IsDiagnosis } from './validators.dto';

export class PatientFilterDto {
  @IsOptional()
  @IsEnum(Diagnosis, { each: true })
  // @ValidateNested()
  // @IsDiagnosis()
  @ApiPropertyOptional({
    example: [Diagnosis.AD, Diagnosis.MCI],
    description: 'Patients with any of these diagnoses',
  })
  diagnoses?: Diagnosis[];

  @IsOptional()
  @IsNumber()
  @IsIn([1, 2])
  @ApiPropertyOptional({
    example: 2,
    description: '1 -> man, 2 -> woman',
  })
  gender?: number;

  // @IsOptional()
  // @IsDateString()
  // fromDate?: Date;

  // @IsOptional()
  // @IsDateString()
  // toDate?: Date;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    example: 1930,
    description: 'From which year birth of patient',
  })
  fromYearBirth?: number;

  @IsOptional()
  @IsNumber()
  @ValidateIf((o) => o.toYearBirth >= o.fromYearBirth)
  @ApiPropertyOptional({
    example: 1950,
    description: 'To which year birth of patient',
  })
  toYearBirth?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'ADNI1',
    description: 'On which adni phase',
  })
  phase?: string;
}
