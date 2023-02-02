import ICreateAccountGameUserDTO from '../dtos/ICreateAccountGameUserDTO';
import AccountGameUser from '../infra/typeorm/entities/AccountGameUser';

export default interface IAccountGameUsersRepository {
  create(datas: ICreateAccountGameUserDTO[]): Promise<AccountGameUser[]>;
  update(data: AccountGameUser): Promise<AccountGameUser>;
  delete(id_account: number): Promise<void>;
}
