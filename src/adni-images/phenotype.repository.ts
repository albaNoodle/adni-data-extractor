import { Phenotype } from "../entities/phenotype.entity";
import { EntityRepository, getConnection, Repository } from "typeorm";
import { PhenotypeCreateDto } from "./dto/phenotype.create.dto";

@EntityRepository(Phenotype)
export class PhenotypeRepository extends Repository<Phenotype>{ 
    async createPhenotype(phenotypeCreateDto: PhenotypeCreateDto): Promise<Phenotype> {
        const { imageUid, brainPartKeyname, value } = phenotypeCreateDto;
        const phenotype = this.create();
        phenotype.imageUid = imageUid;
        phenotype.brainPartKeyname = brainPartKeyname;
        phenotype.value = value;
        return phenotype.save();
    }

    async createOrUpdatePhenotypes(phenotypeCreateDtos: PhenotypeCreateDto[]): Promise<Phenotype[]>  {
        return this.manager.transaction( 'SERIALIZABLE', async () => {
        const phenotipes = phenotypeCreateDtos.map((phenotypeCreate) => {
            const { imageUid, brainPartKeyname, value } = phenotypeCreate;
            const phenotype = this.create();
            phenotype.imageUid = imageUid;
            phenotype.brainPartKeyname = brainPartKeyname;
            phenotype.value = value;
            return phenotype;
        });

        await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Phenotype)
        .values(phenotipes)
        .orUpdate({ conflict_target: ['imageUid', 'brainPartKeyname'], overwrite: [ 'value'] })
        .updateEntity(false)
        .execute();
        
        await Promise.all(phenotipes.map(async (p) => await p.reload()));

        return phenotipes;
    });
    }
}