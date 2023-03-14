import ICreateAccountGameUserDTO from '../dtos/ICreateAccountGameUserDTO';
import IUpdateAccountGameUserDTO from '../dtos/IUpdateAccountGameUserDTO';
import AccountGameUser from '../infra/typeorm/entities/AccountGameUser';

export default interface IAccountGameUsersRepository {
  findAllByIdUser(id_user: number): Promise<AccountGameUser[]>;
  create(datas: ICreateAccountGameUserDTO[]): Promise<AccountGameUser[]>;
  update(data: AccountGameUser): Promise<AccountGameUser>;
  updateAll(datas: IUpdateAccountGameUserDTO[]): Promise<AccountGameUser[]>;
  delete(id_account: number): Promise<void>;
  deleteByIdUser(id_user: number): Promise<void>;
}

