import { BrainPart } from '../entities/brain-part.entity';
import { EntityRepository, getConnection, Repository } from 'typeorm';
import { BrainPartCreateDto } from './dto/brain-part.create.dto';
import { BrainPartFilterDto } from './dto/brain-part.filter.dto';

@EntityRepository(BrainPart)
export class BrainPartRepository extends Repository<BrainPart> {
  async createBrainPart(brainPartCreateDto: BrainPartCreateDto): Promise<BrainPart> {
    const { keyname, humanName, dictionary } = brainPartCreateDto;
    const brainPart = this.create();
    brainPart.keyname = keyname;
    brainPart.humanName = humanName;
    brainPart.dictionary = dictionary;
    return brainPart.save();
  }

  async updateBrainPart(adniBrainPartCreateDto: BrainPartCreateDto): Promise<BrainPart> {
    return this.manager.transaction('SERIALIZABLE', async () => {
      await this.update({ keyname: adniBrainPartCreateDto.keyname, dictionary: adniBrainPartCreateDto.dictionary }, adniBrainPartCreateDto);
      return this.findOne({ keyname: adniBrainPartCreateDto.keyname, dictionary: adniBrainPartCreateDto.dictionary });
    });
  }

  async createOrUpdatePhenotypes(adniBrainPartCreateDtos: BrainPartCreateDto[]): Promise<BrainPart[]> {
    return this.manager.transaction('SERIALIZABLE', async () => {
      const brainParts = adniBrainPartCreateDtos.map((brainPartCreateDto) => {
        const { keyname, humanName, dictionary } = brainPartCreateDto;
        const brainPart = this.create();
        brainPart.keyname = keyname;
        brainPart.humanName = humanName;
        brainPart.dictionary = dictionary;
        return brainPart;
      });

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(BrainPart)
        .values(brainParts)
        .orUpdate({ conflict_target: ['keyname', 'dictionary'], overwrite: ['humanName'] })
        .updateEntity(false)
        .execute();

      return brainParts;
    });
  }

  async getBrainParts(brainPartFilerDto: BrainPartFilterDto): Promise<BrainPart[]> {
    const { dictionary } = brainPartFilerDto;
    return this.manager.transaction('SERIALIZABLE', async () => {
      let query = this.createQueryBuilder('bp');
      query.select(['bp.keyname', 'bp.humanName']);
      if (dictionary) {
        query.where('bp.dictionary = :dictionary', { dictionary });
      }
      query.distinct(true);
      return query.getRawMany();
    });
  }
}
