import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdniDictionaryLoadInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'data/adni/UCSFFSX51_ADNI1_3T_DICT_11_01_13.csv',
    description: 'path to the dictionary csv file',
  })
  path: string;
}
