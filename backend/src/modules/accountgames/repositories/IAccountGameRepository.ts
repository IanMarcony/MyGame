import AccountGame from '../infra/typeorm/entities/AccountGame';

export default interface IAccountGameRepository {
  findAll(): Promise<AccountGame[]>;
}
