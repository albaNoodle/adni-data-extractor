import { BrainPart } from "../entities/brain-part.entity";
import { EntityRepository, Repository } from "typeorm";
import { BrainPartCreateDto } from "./dto/brain-part.create.dto";

@EntityRepository(BrainPart)
export class BrainPartRepository extends Repository<BrainPart>{ 
    async createBrainPart(brainPartCreateDto: BrainPartCreateDto): Promise<BrainPart> {
        const { keyname, humanName, dictionary } = brainPartCreateDto;
        const brainPart = this.create();
        brainPart.keyname = keyname;
        brainPart.humanName = humanName;
        brainPart.dictionary = dictionary;
        return brainPart.save();
    }

    async updateBrainPart(adniBrainPartCreateDto: BrainPartCreateDto): Promise<BrainPart> {
        return this.manager.transaction( 'SERIALIZABLE', async () => {
            await this.update(
                { keyname: adniBrainPartCreateDto.keyname, dictionary: adniBrainPartCreateDto.dictionary},
                adniBrainPartCreateDto
            );
            return this.findOne({ keyname: adniBrainPartCreateDto.keyname, dictionary: adniBrainPartCreateDto.dictionary});
        });
    }
}