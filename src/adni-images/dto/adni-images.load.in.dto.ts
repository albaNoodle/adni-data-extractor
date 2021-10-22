import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdniImagesLoadInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'data/test/phenotypes.csv',
    description: 'csv file with the list of the patients id that want to extract the data',
  })
  path: string;
}
