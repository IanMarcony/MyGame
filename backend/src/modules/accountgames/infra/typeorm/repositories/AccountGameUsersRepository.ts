import ICreateAccountGameUserDTO from '@modules/accountgames/dtos/ICreateAccountGameUserDTO';
import IUpdateAccountGameUserDTO from '@modules/accountgames/dtos/IUpdateAccountGameUserDTO';
import IAccountGameUsersRepository from '@modules/accountgames/repositories/IAccountGameUsersRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import AccountGameUser from '../entities/AccountGameUser';

export default class AccountGameUsersRepository
  implements IAccountGameUsersRepository
{
  private ormRepository: Repository<AccountGameUser>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(AccountGameUser);
  }

  public async deleteByIdUser(id_user: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('id_user = :id_user', { id_user })
      .execute();
  }
  public async findAllByIdUser(id_user: number): Promise<AccountGameUser[]> {
    const accountGameUsers = await this.ormRepository.find({
      where: { id_user },
      relations: { account_game: true },
    });

    return accountGameUsers;
  }
  public async create(
    datas: ICreateAccountGameUserDTO[],
  ): Promise<AccountGameUser[]> {
    const accountGameUsers = this.ormRepository.create(datas);
    await this.ormRepository.save(accountGameUsers);
    return accountGameUsers;
  }

  public async update(data: AccountGameUser): Promise<AccountGameUser> {
    return await this.ormRepository.save(data);
  }

  public async updateAll(
    datas: IUpdateAccountGameUserDTO[],
  ): Promise<AccountGameUser[]> {
    return await this.ormRepository.save(datas);
  }
  public async delete(id_account: number): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id_account', { id_account })
      .execute();
  }
}

