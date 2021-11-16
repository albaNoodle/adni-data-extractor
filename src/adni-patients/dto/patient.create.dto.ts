import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from 'class-validator';
import { Diagnosis } from 'src/enums/diagnosis.enum';

export class PatientCreateDto {
  @IsNotEmpty()
  @IsNumber()
  rid: number;

  @IsNotEmpty()
  @IsString()
  ptid: string;

  @IsNotEmpty()
  @IsString()
  phase: string;

  @IsNotEmpty()
  @IsEnum(Diagnosis)
  diagnosis: Diagnosis;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([1, 2])
  gender: number;

  @IsNotEmpty()
  @IsNumber()
  birthYear: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(12)
  birthMonth: number;
}
