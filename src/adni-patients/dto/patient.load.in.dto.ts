import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PatientLoadInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'data/adni/ADNI_Complete1YearVisitList_8_22_12.csv',
    description: 'csv file with the list of the visits that contain patients data',
  })
  visitsPath: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'data/adni/PTDEMOG.csv',
    description: 'csv file with the list of the demographic data of patients',
  })
  demogPath: string;
}
