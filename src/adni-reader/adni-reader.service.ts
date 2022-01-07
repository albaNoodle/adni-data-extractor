import { Inject, Injectable } from '@nestjs/common';
import { AdniImagesService } from 'src/adni-images/adni-images.service';
import { AdniImagesFilterDto } from 'src/adni-images/dto/adni-images.filter.dto';
import { AdniPatientsService } from 'src/adni-patients/adni-patients.service';
import { AdniImage } from 'src/entities/adni-image.entity';
import { Patient } from 'src/entities/patient.entity';
import * as fs from 'fs';
import { Diagnosis } from 'src/enums/diagnosis.enum';

export class ExportEntry {
  imageUid: number;
  rid: number;
  ptid: string;
  age: number;
  diagnosis: Diagnosis;
  visCode: string;
  examDate: Date;
  phenotypes: Map<string, number>; // Phenotype label, value
}

const MAX_PTS_PER_LOOP = 100;

@Injectable()
export class AdniReaderService {
  constructor(
    @Inject(AdniImagesService)
    private adniImagesService: AdniImagesService,

    @Inject(AdniPatientsService)
    private adniPatientsService: AdniPatientsService
  ) {}

  async getPhenotypesCsv(adniImagesFilterDto: AdniImagesFilterDto): Promise<string> {
    const { patientsPtids, phenotypes } = adniImagesFilterDto;

    const adniImages = await this.adniImagesService.getAdniImages(adniImagesFilterDto);
    const patients = await this.adniPatientsService.getPatientsByPtids(patientsPtids);
    return this.generateAdniCsv(adniImages, patients, phenotypes);
  }

  private getExportEntries(
    adniImages: AdniImage[],
    adniPatients: Patient[],
    phenotypeLabels: string[]
  ): ExportEntry[] {
    const exportEntries = [];
    adniImages.map((image) => {
      const patient = adniPatients.find((p) => p.rid === image.rid);
      if (!patient) {
        throw new Error(
          `No patient with rid '${image.rid}' associated to image '${image.imageUid}'`
        );
      }
      const exportEntry: ExportEntry = {
        imageUid: image.imageUid,
        rid: patient.rid,
        ptid: patient.ptid,
        age: this.calculateAge(image.examDate, patient.birthMonth, patient.birthYear),
        diagnosis: patient.diagnosis,
        visCode: image.visCode,
        examDate: image.examDate,
        phenotypes: new Map<string, number>(),
      };

      phenotypeLabels.map((ph) => {
        const phenotype = image.phenotypes.find((iph) => iph.brainPartKeyname === ph);
        if (!phenotype) {
          return exportEntry.phenotypes.set(ph, -1);
        }
        return exportEntry.phenotypes.set(ph, phenotype.value);
      });

      // exportEntry.phenotypes = phenotypes;
      return exportEntries.push(exportEntry);
    });

    return exportEntries;
  }

  private generateAdniCsv(
    adniImages: AdniImage[],
    adniPatients: Patient[],
    phenotypeLabels: string[]
  ): string {
    const exportEntries = this.getExportEntries(adniImages, adniPatients, phenotypeLabels);
    const path = 'tmp_docs/tmp.csv';

    let writeStream = fs.createWriteStream(path, { encoding: 'utf8' });

    const header = this.writeHeader(phenotypeLabels);

    // write some data with a utf-8 encoding
    writeStream.write(header);

    if (exportEntries.length > MAX_PTS_PER_LOOP) {
      let iFinal = MAX_PTS_PER_LOOP;
      let iInit = 0;
      while (iInit < exportEntries.length) {
        const exportEntriesToProcess = exportEntries.slice(iInit, iFinal);
        exportEntriesToProcess.map((e) => {
          const entry = [
            e.imageUid,
            e.rid,
            e.ptid,
            e.age,
            e.diagnosis,
            e.visCode,
            e.examDate.toISOString(),
          ];
          for (let phenotypeLabel of phenotypeLabels) {
            const phenoValue = e.phenotypes.get(phenotypeLabel);
            if (phenoValue >= 0) {
              entry.push(phenoValue);
            } else {
              entry.push(-1);
            }
          }

          const writableEntry = entry.join(',') + '\n';
          writeStream.write(writableEntry);
        });
        iInit = iFinal;
        iFinal += MAX_PTS_PER_LOOP;
      }
    } else {
      exportEntries.map((e) => {
        const entry = [
          e.imageUid,
          e.rid,
          e.ptid,
          e.age,
          e.diagnosis,
          e.visCode,
          e.examDate.toISOString(),
        ];
        for (let phenotypeLabel of phenotypeLabels) {
          const phenoValue = e.phenotypes.get(phenotypeLabel);
          if (phenoValue >= 0) {
            entry.push(phenoValue);
          } else {
            entry.push(-1);
          }
        }

        const writableEntry = entry.join(',') + '\n';
        writeStream.write(writableEntry);
      });
    }

    writeStream.on('finish', () => {
      console.log('wrote all data to file');
    });

    // close the stream
    writeStream.end();
    writeStream.close();
    return path;
  }

  private writeHeader(phenotypeLabels: string[]): string {
    const header = ['Image.Uid', 'RID', 'PTID', 'AGE', 'Diagnosis', 'VISCODE', 'EXAMDATE'];
    header.push(...phenotypeLabels);
    return header.join(',') + '\n';
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

  // Utils
  private calculateAge(examDate: Date, birthMonth: number, birthYear: number): number {
    const examMonth = examDate.getMonth() + 1;
    const examYear = examDate.getFullYear();
    const monthsAge = examMonth - birthMonth + (examYear - birthYear) * 12;
    const age = monthsAge / 12;
    return Math.round(age * 100) / 100;
  }
}
