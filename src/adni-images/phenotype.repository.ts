import { Phenotype } from "src/entities/phenotype.entity";
import { EntityRepository, Repository } from "typeorm";
import { PhenotypeCreateDto } from "./dto/phenotype.create.dto";

@EntityRepository(Phenotype)
export class PhenotypeRepository extends Repository<Phenotype>{ 
    async createPhenotype(phenotypeCreateDto: PhenotypeCreateDto): Promise<Phenotype> {
        const { imageUid, brainPartKey, value } = phenotypeCreateDto;
        const phenotype = this.create();
        phenotype.imageUid = imageUid;
        phenotype.brainPartKey = brainPartKey;
        phenotype.value = value;
        return phenotype.save();
    }
}