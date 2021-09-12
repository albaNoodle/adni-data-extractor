import { AdniImage } from "src/entities/adni-image.entity";
import { EntityRepository, Repository, UpdateResult } from "typeorm";
import { AdniImageCreateDto } from "./dto/adni-image.create.dto";

@EntityRepository(AdniImage)
export class AdniImageRepository extends Repository<AdniImage>{ 
    async createAdniImage(adniImageCreateDto: AdniImageCreateDto): Promise<AdniImage> {
        const { imageUid, rid, visCode, examDate } = adniImageCreateDto;
        const adniImage = this.create();
        adniImage.imageUid = imageUid;
        adniImage.rid = rid;
        adniImage.visCode = visCode;
        adniImage.examDate = new Date(examDate);
        return adniImage.save();
    }

    async updateAdniImage(adniImageCreateDto: AdniImageCreateDto): Promise<AdniImage> {
        return this.manager.transaction( 'SERIALIZABLE', async () => {
            await this.update({ imageUid: adniImageCreateDto.imageUid}, adniImageCreateDto);
            return this.findOne({ imageUid: adniImageCreateDto.imageUid});
        });
    }
}