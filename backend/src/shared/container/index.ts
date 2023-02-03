import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IPreferenceRepository from '@modules/categoriesgames/repositories/IPreferenceRepository';
import PreferenceRepository from '@modules/categoriesgames/infra/typeorm/repositories/PreferenceRepository';
import IAccountGameUsersRepository from '@modules/accountgames/repositories/IAccountGameUsersRepository';
import AccountGameUsersRepository from '@modules/accountgames/infra/typeorm/repositories/AccountGameUsersRepository';
import IAccountGameRepository from '@modules/accountgames/repositories/IAccountGameRepository';
import AccountGameRepository from '@modules/accountgames/infra/typeorm/repositories/AccountGameRepository';

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

container.registerSingleton<IAccountGameRepository>(
  'AccountGameRepository',
  AccountGameRepository,
);
