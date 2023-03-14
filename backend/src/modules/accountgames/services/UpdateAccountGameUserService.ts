import { inject, injectable } from 'tsyringe';
import IUpdateAccountGameUserDTO from '../dtos/IUpdateAccountGameUserDTO';
import AccountGameUser from '../infra/typeorm/entities/AccountGameUser';
import IAccountGameUsersRepository from '../repositories/IAccountGameUsersRepository';

interface IAccountGameUser {
  username: string;
  id_account_game: number;
}

interface IRequest {
  id_user: number;
  accounts: IAccountGameUser[];
}

@injectable()
export default class UpdateAccountGameUserService {
  constructor(
    @inject('AccountGameUsersRepository')
    private accountGameUsersRepository: IAccountGameUsersRepository,
  ) {}

  async execute({ accounts, id_user }: IRequest): Promise<AccountGameUser[]> {
    await this.accountGameUsersRepository.deleteByIdUser(id_user);

    const accountsToSave = accounts.map(({ id_account_game, username }) => {
      return {
        username,
        id_account_game,
        id_user,
      };
    });

    const resultSave = await this.accountGameUsersRepository.create(
      accountsToSave,
    );

    return resultSave;
  }
}
