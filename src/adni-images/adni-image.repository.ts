import { AdniImage } from '../entities/adni-image.entity';
import { EntityRepository, getConnection, OrderByCondition, Repository, UpdateResult } from 'typeorm';
import { AdniImageCreateDto } from './dto/adni-image.create.dto';
import { AdniImagesFilterDto } from './dto/adni-images.filter.dto';
import { Patient } from 'src/entities/patient.entity';
import { BrainPart } from 'src/entities/brain-part.entity';

@EntityRepository(AdniImage)
export class AdniImageRepository extends Repository<AdniImage> {
  async createAdniImage(adniImageCreateDto: AdniImageCreateDto): Promise<AdniImage> {
    const { imageUid, rid, visCode, examDate } = adniImageCreateDto;
    const adniImage = this.create();
    adniImage.imageUid = imageUid;
    adniImage.rid = rid;
    adniImage.visCode = visCode;
    adniImage.examDate = new Date(examDate);
    return adniImage.save();
  }

  // async updateAdniImage(adniImageCreateDto: AdniImageCreateDto): Promise<AdniImage> {
  //   return this.manager.transaction('SERIALIZABLE', async () => {
  //     await this.update({ imageUid: adniImageCreateDto.imageUid }, adniImageCreateDto);
  //     return this.findOne({ imageUid: adniImageCreateDto.imageUid });
  //   });
  // }

  async createOrUpdateAdniImages(adniImsageCreateDtos: AdniImageCreateDto[]): Promise<AdniImage[]> {
    return this.manager.transaction('SERIALIZABLE', async () => {
      const images = adniImsageCreateDtos.map((adniImageCreateDto) => {
        const { imageUid, rid, visCode, examDate } = adniImageCreateDto;
        const adniImage = this.create();
        adniImage.imageUid = imageUid;
        adniImage.rid = rid;
        adniImage.visCode = visCode;
        adniImage.examDate = new Date(examDate);
        return adniImage;
      });

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(AdniImage)
        .values(images)
        .orUpdate({ conflict_target: ['imageUid'], overwrite: ['rid', 'visCode', 'examDate'] })
        .updateEntity(false)
        .execute();

      await Promise.all(images.map(async (p) => await p.reload()));

      return images;
    });
  }

  async getAdniImages(adniImagesFilterDto: AdniImagesFilterDto): Promise<AdniImage[]> {
    const { fromDate, toDate, patientsPtids, phenotypes } = adniImagesFilterDto;
    const query = this.createQueryBuilder('image');
    query.innerJoinAndMapOne('image.patient', Patient, 'patient', 'patient.rid = image.rid');
    if (!phenotypes || phenotypes.length === 0) {
      query.leftJoinAndSelect('image.phenotypes', 'phenotype');
    } else {
      query.leftJoinAndSelect('image.phenotypes', 'phenotype', 'phenotype.brainPartKeyname IN (:phenotypes)', { phenotypes });
    }
    query.leftJoinAndMapOne('phenotype.brainPart', BrainPart, 'bp', 'bp.keyname = phenotype.brainPartKeyname');
    query.where('patient.ptid IN (:patientsPtids)', { patientsPtids });

    const orderCondition: OrderByCondition = {};
    if (fromDate) {
      query.andWhere('image.examDate >= :fromDate', { fromDate });
      orderCondition[`image.examDate`] = 'ASC';
      orderCondition[`image.imageUid`] = 'ASC';
    }
    if (toDate) {
      query.andWhere('image.examDate >= :toDate', { toDate });
      orderCondition[`image.examDate`] = 'DESC';
      orderCondition[`image.imageUid`] = 'DESC';
    }

    return query.getMany();
  }
}
