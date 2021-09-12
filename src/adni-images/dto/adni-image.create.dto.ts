import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
 
export class AdniImageCreateDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
    example: 12345,
    description: 'ADNI UID of the image',
    })
    imageUid: number;

    // @ManyToOne(() => Patient, patient => patient.adniImages, {eager: false})
    // patient: Patient;

    @IsNotEmpty()
    @IsNumber()
    rid: number;
    
    @IsNotEmpty()
    @IsDateString()
    examDate: Date;

    @IsNotEmpty()
    @IsString()
    visCode: string;
}
