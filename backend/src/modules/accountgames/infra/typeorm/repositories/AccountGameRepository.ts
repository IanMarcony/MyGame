import IAccountGameRepository from '@modules/accountgames/repositories/IAccountGameRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import AccountGame from '../entities/AccountGame';

export default class AccountGameRepository implements IAccountGameRepository {
  private ormRepository: Repository<AccountGame>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(AccountGame);
  }

  public async findAll(): Promise<AccountGame[]> {
    return await this.ormRepository.find();
  }
}
