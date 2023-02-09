import CategoryGame from '../infra/typeorm/entities/CategoryGame';

export default interface ICategoryGameRepository {
  findAll(): Promise<CategoryGame[]>;
}
