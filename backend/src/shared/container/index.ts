import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IPreferenceRepository from '@modules/categoriesgames/repositories/IPreferenceRepository';
import IAccountGameUsersRepository from '@modules/accountgames/repositories/IAccountGameUsersRepository';
import PreferenceRepository from '@modules/categoriesgames/infra/typeorm/repositories/PreferenceRepository';
import AccountGameUsersRepository from '@modules/accountgames/infra/typeorm/repositories/AccountGameUsersRepository';
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IPreferenceRepository>(
  'PreferencesRepository',
  PreferenceRepository,
);

container.registerSingleton<IAccountGameUsersRepository>(
  'AccountGameUsersRepository',
  AccountGameUsersRepository,
);
