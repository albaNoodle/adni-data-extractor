import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdniFilesInterceptor } from '../interceptors/adni-files.interceptor';
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

  @Post('/path')
  @ApiOperation({ summary: 'Generates ADNI patients on database from a .csv file' })
  async loadAdniImages(@Body() adniPatientsLoadInDto: PatientLoadInDto): Promise<Patient[]> {
    return this.adniPatientsService.loadPatients(adniPatientsLoadInDto);
  }

  @Post()
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(AdniFilesInterceptor(['fileVisits', 'fileDemog']))
  @ApiOperation({ summary: 'Generates ADNI images on database from a .csv file' })
  async loadCsvPatients(@UploadedFiles() files: { fileVisits: Express.Multer.File; fileDemog: Express.Multer.File }): Promise<Patient[]> {
    const { fileVisits, fileDemog } = files;
    const adniPatientsLoadInDto: PatientLoadInDto = { demogPath: fileDemog[0].path, visitsPath: fileVisits[0].path };
    return this.adniPatientsService.loadPatients(adniPatientsLoadInDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Generates ADNI patients on database from a .csv file' })
  async getAdniPatients(@Query() adniPatientFilterDto: PatientFilterDto): Promise<Patient[]> {
    return this.adniPatientsService.getPatients(adniPatientFilterDto);
  }
}
