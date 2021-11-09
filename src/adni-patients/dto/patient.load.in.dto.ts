import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PatientLoadInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'data/test/visits.csv',
    description: 'csv file with the list of the visits that contain patients data',
  })
  visitsPath: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'data/test/ptdemog.csv',
    description: 'csv file with the list of the demographic data of patients',
  })
  demogPath: string;
}
