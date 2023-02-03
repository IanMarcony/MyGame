import ICategoryGameRepository from '@modules/categoriesgames/repositories/ICategoryGameRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import CategoryGame from '../entities/CategoryGame';

export default class CategoryGameRepository implements ICategoryGameRepository {
  private ormRepository: Repository<CategoryGame>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(CategoryGame);
  }
  public async findAll(): Promise<CategoryGame[]> {
    return await this.ormRepository.find();
  }
}
