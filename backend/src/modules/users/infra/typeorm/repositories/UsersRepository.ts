import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { Repository } from 'typeorm';
import { AppDataSource } from 'data-source';
import User from '../entities/User';

export default class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  public async findByName(name: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({ where: { name } });

    return user;
  }

  public async findByEmailWithFullProfile(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({
      where: { email },
      relations: { account_games_users: true, preferences: true },
    });

    return user;
  }

  public async findById(id: number): Promise<User | null> {
    const user = await this.ormRepository.findOne({ where: { id } });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }
  public async delete({ email }: User): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('email = :email', { email })
      .execute();
  }
}
