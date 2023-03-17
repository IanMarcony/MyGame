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
import ICategoryGameRepository from '@modules/categoriesgames/repositories/ICategoryGameRepository';
import CategoryGameRepository from '@modules/categoriesgames/infra/typeorm/repositories/CategoryGameRepository';
import ICommentRepository from '@modules/posts/repositories/ICommentRepository';
import CommentRepository from '@modules/posts/infra/typeorm/repositories/CommentRepository';
import IFilesPostRepository from '@modules/posts/repositories/IFilesPostRepository';
import FilesPostRepository from '@modules/posts/infra/typeorm/repositories/FilesPostRepository';
import IInteractionsRepository from '@modules/posts/repositories/IInteractionsRepository';
import InteractionsRepository from '@modules/posts/infra/typeorm/repositories/InteractionsRepository';
import IPostsRepository from '@modules/posts/repositories/IPostsRepository';
import PostsRepository from '@modules/posts/infra/typeorm/repositories/PostsRepository';
import IFriendRequestsRepository from '@modules/users/repositories/IFriendRequestsRepository';
import FriendRequestsRepository from '@modules/users/infra/typeorm/repositories/FriendRequestsRepository';
import IFriendsRepository from '@modules/users/repositories/IFriendsRepository';
import FriendsRepository from '@modules/users/infra/typeorm/repositories/FriendsRepository';
import IChatsRepository from '@modules/chat/repositories/IChatsRepository';
import ChatsRepository from '@modules/chat/infra/typeorm/repositories/ChatsRepository';
import IMessagesRepository from '@modules/chat/repositories/IMessagesRepository';
import MessagesRepository from '@modules/chat/infra/typeorm/repositories/MessagesRepository';

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

container.registerSingleton<ICategoryGameRepository>(
  'CategoryGameRepository',
  CategoryGameRepository,
);

container.registerSingleton<IAccountGameUsersRepository>(
  'AccountGameUsersRepository',
  AccountGameUsersRepository,
);

container.registerSingleton<IAccountGameRepository>(
  'AccountGameRepository',
  AccountGameRepository,
);

container.registerSingleton<ICommentRepository>(
  'CommentsRepository',
  CommentRepository,
);

container.registerSingleton<IFilesPostRepository>(
  'FilesPostRepository',
  FilesPostRepository,
);

container.registerSingleton<IInteractionsRepository>(
  'InteractionsRepository',
  InteractionsRepository,
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);

container.registerSingleton<IFriendRequestsRepository>(
  'FriendRequestsRepository',
  FriendRequestsRepository,
);

container.registerSingleton<IFriendsRepository>(
  'FriendsRepository',
  FriendsRepository,
);

container.registerSingleton<IChatsRepository>(
  'ChatsRepository',
  ChatsRepository,
);

container.registerSingleton<IMessagesRepository>(
  'MessagesRepository',
  MessagesRepository,
);
