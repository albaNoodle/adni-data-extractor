import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Patient } from 'src/entities/patient.entity';
import { AdniPatientsService } from './adni-patients.service';
import { PatientLoadInDto } from './dto/patient.load.in.dto';

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
}
