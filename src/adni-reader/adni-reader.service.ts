import { Inject, Injectable } from '@nestjs/common';
import { AdniImagesService } from 'src/adni-images/adni-images.service';
import { AdniImagesFilterDto } from 'src/adni-images/dto/adni-images.filter.dto';
import { AdniPatientsService } from 'src/adni-patients/adni-patients.service';
import { AdniImage } from 'src/entities/adni-image.entity';
import { Patient } from 'src/entities/patient.entity';

export class writableImageRow {

}

@Injectable()
export class AdniReaderService {
  constructor(
    @Inject(AdniImagesService)
    private adniImagesService: AdniImagesService,

    @Inject(AdniPatientsService)
    private adniPatientsService: AdniPatientsService
  ) {}

  async getPhenotypesCsv(adniImagesFilterDto: AdniImagesFilterDto): Promise<File> {
    const { patientsPtids, phenotypes } = adniImagesFilterDto;

    const adniImages = await this.adniImagesService.getAdniImages(adniImagesFilterDto);
    const patients = await this.adniPatientsService.getPatientsByPtids(patientsPtids);
    return this.generateAdniCsv(adniImages, patients, phenotypes);
  }

  private generateAdniCsv(adniImages: AdniImage[], adniPatients: Patient[], phenotypeLabels: string[]): Promise<File> {
    this.writeHeader(phenotypeLabels);
  }

  private writeHeader(phenotypeLabels: string[]) {
    const header = ["Image.Uid", "PTID","Diagnosis","VISCODE","EXAMDATE"];
    header.push(...phenotypeLabels)
  }

  // JSON to CSV Converter
  private ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ',';

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }
}
