import { Repository } from 'typeorm';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';
import { AppDataSource } from 'data-source';

export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.ormRepository.findOne({ where: { token } });

    return userToken;
  }
  public async generate(user_id: number): Promise<UserToken> {
    const userToken = await this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
