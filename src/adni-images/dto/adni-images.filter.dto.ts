import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class AdniImagesFilterDto {
  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: new Date('01-01-2012'),
    description: 'Images from this date',
  })
  fromDate?: Date;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: new Date('01-01-2013'),
    description: 'Images until this date',
  })
  toDate?: Date;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: ['011_S_0001', '011_S_0002', '011_S_0003'],
    description: `List of patient's ptids for getting the images`,
  })
  patientsPtids: string[];

  @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    example: ['ST14CV', 'ST1SV'],
    description: `List of brain part keyname of the phenotypes selected`,
  })
  phenotypes?: string[];
}
