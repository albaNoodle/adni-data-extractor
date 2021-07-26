import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
 
export class OptionsInDto {
 @IsNotEmpty()
 @IsString()
 @ApiProperty({
   example: 'data/test/patients.csv',
   description: 'csv file with the list of the patients id that want to extract the data',
 })
 patientsFilepath: string;
 
//  @IsNotEmpty()
//  @Type(() => String)
//  @IsArray()
//  @ApiProperty({
//    example: ['username01', 'username02'],
//    description: 'Usenames to join the room',
//    type: [String],
//  })
//  usernames: string[]; // users' usernames
 
//  @IsOptional()
//  @IsBoolean()
//  @ApiProperty({
//    example: true,
//    description: 'It is the room with all members of emergency team of user creating the room',
//  })
//  isEmergencyRoom?: boolean;
}
