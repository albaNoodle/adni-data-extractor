import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
 
export class PhenotypeCreateDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
    example: 12345,
    description: 'ADNI UID of the image',
    })
    imageUid: number;

    @IsNotEmpty()
    @IsString()
    brainPartKey: string;

    @IsNotEmpty()
    @IsNumber()
    value: number;
}
