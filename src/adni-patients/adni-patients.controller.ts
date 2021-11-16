import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Patient } from '../entities/patient.entity';
import { AdniPatientsService } from './adni-patients.service';
import { PatientFilterDto } from './dto/patient.filter.dto';
import { PatientLoadInDto } from './dto/patient.load.in.dto';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Adni patients')
@Controller('adni-patients')
export class AdniPatientsController {
  constructor(
    @Inject(AdniPatientsService)
    private adniPatientsService: AdniPatientsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Generates ADNI patients on database from a .csv file' })
  async loadAdniImages(@Body() adniPatientsLoadInDto: PatientLoadInDto): Promise<Patient[]> {
    return this.adniPatientsService.loadPatients(adniPatientsLoadInDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Generates ADNI patients on database from a .csv file' })
  async getAdniPatients(@Query() adniPatientFilterDto: PatientFilterDto): Promise<Patient[]> {
    return this.adniPatientsService.getPatients(adniPatientFilterDto);
  }
}
