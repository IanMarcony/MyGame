import { inject, injectable } from 'tsyringe';
import AccountGameUser from '../infra/typeorm/entities/AccountGameUser';
import IAccountGameUsersRepository from '../repositories/IAccountGameUsersRepository';

interface IAccountGameUser {
  username: string;
  id_account_game_user?: number;
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
    const accountsToSave = accounts
      .filter((item) => item.id_account_game_user === undefined)
      .map((item) => {
        return {
          username: item.username,
          id_account_game: item.id_account_game,
          id_user,
        };
      });

    const accountsToUpdate = accounts
      .filter((item) => item.id_account_game_user !== undefined)
      .map((item) => {
        return {
          username: item.username,
          id_account_game: item.id_account_game,
          id: item.id_account_game_user,
          id_user,
        };
      });

    const resultSave = await this.accountGameUsersRepository.create(
      accountsToSave,
    );
    const resultUpdate = await this.accountGameUsersRepository.updateAll(
      accountsToUpdate,
    );

    return [...resultSave, ...resultUpdate];
  }
}
