import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';
import IPreferenceRepository from '@modules/categoriesgames/repositories/IPreferenceRepository';
import IAccountGameUsersRepository from '@modules/accountgames/repositories/IAccountGameUsersRepository';

interface IPreference {
  id_category_game: number;
}

interface IAccountGameUser {
  username: string;
  id_account_game: number;
}

interface IRequest {
  name: string;
  email: string;
  password: string;
  birth_date: string;
  description: string;
  accounts_game: IAccountGameUser[];
  preferences: IPreference[];
}
@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('PreferencesRepository')
    private preferencesRepository: IPreferenceRepository,
    @inject('AccountGameUsersRepository')
    private accountGameUsersRepository: IAccountGameUsersRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    birth_date,
    description,
    accounts_game,
    preferences,
  }: IRequest): Promise<User> {
    if (password.length < 8 || password.length > 16) {
      throw new AppError('Password length minimum is 8 and maximum is 16.');
    }

    if (preferences.length <= 0) {
      throw new AppError('Select at least one preference');
    }

    const checkUserExistWithSameName = await this.usersRepository.findByName(
      name,
    );

    if (checkUserExistWithSameName) {
      throw new AppError('Name already exists');
    }

    const checkUserExistWithSameEmail = await this.usersRepository.findByEmail(
      email,
    );

    if (checkUserExistWithSameEmail) {
      throw new AppError('Email address already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      birth_date: new Date(birth_date).toISOString(),
      description,
    });

    const id_user = user.id;

    const dataPreferences = preferences.map((item) => {
      return {
        ...item,
        id_user,
      };
    });

    await this.preferencesRepository.create(dataPreferences);

    const dataAccountGames = accounts_game.map((item) => {
      return {
        ...item,
        id_user,
      };
    });

    await this.accountGameUsersRepository.create(dataAccountGames);

    return user;
  }
}
