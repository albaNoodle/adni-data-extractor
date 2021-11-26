import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AdniReportDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: new Date().getTime(),
    description: 'Name of the resulting document',
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'docs',
    description: 'Path for the resulting document',
  })
  path?: string;
}
