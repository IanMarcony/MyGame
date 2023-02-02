import ICreatePreferenceDTO from '@modules/categoriesgames/dtos/ICreatePreferenceDTO';
import IPreferenceRepository from '@modules/categoriesgames/repositories/IPreferenceRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import Perference from '../entities/Preference';

export default class PreferenceRepository implements IPreferenceRepository {
  private ormRepository: Repository<Perference>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Perference);
  }

  public async create(datas: ICreatePreferenceDTO[]): Promise<Perference[]> {
    const preferences = this.ormRepository.create(datas);
    await this.ormRepository.save(preferences);
    return preferences;
  }

  public async delete(id_preference: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id_preference', { id_preference })
      .execute();
  }
}
