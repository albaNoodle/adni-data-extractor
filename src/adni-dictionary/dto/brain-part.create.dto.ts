import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
 
export class BrainPartCreateDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
    example: 'ST1SV',
    description: 'Keyname (FLDNAME) of the brain part',
    })
    keyname: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
    example: 'Subcortical Volume (aseg.stats) of Brainstem',
    description: 'Human name (TEXT) of the brain part',
    })
    humanName: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
    example: 'UCSFFSL51ALL',
    description: 'Human name (TEXT) of the brain part',
    })
    dictionary: string;
}
