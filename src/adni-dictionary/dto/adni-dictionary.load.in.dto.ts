import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdniDictionaryLoadInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'data/test/dictionary.csv',
    description: 'path to the dictionary csv file',
  })
  path: string;
}
