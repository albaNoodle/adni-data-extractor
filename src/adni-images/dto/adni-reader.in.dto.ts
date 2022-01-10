import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AdniReaderInDto {
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
  @IsNotEmpty()
  @IsString({ each: true })
  @ApiProperty({
    example: ['011_S_0001', '011_S_0002', '011_S_0003'],
    description: `List of patient's ptids for getting the images`,
  })
  patientsPtids: string[];

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  @ApiProperty({
    example: ['ST14CV', 'ST1SV'],
    description: `List of brain part keyname of the phenotypes selected`,
  })
  phenotypes: string[];

  // @IsOptional()
  // @IsString()
  // @ApiPropertyOptional({
  //   example: 'adni-unizar',
  //   description: `Name of the generated csv`,
  // })
  // fileName?: string;
}
