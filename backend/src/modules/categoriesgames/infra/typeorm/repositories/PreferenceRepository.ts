import ICreatePreferenceDTO from '@modules/categoriesgames/dtos/ICreatePreferenceDTO';
import IPreferenceRepository from '@modules/categoriesgames/repositories/IPreferenceRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import Preference from '../entities/Preference';

export default class PreferenceRepository implements IPreferenceRepository {
  private ormRepository: Repository<Preference>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Preference);
  }

  public async create(datas: ICreatePreferenceDTO[]): Promise<Preference[]> {
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
