import AccountGameUser from '@modules/accountgames/infra/typeorm/entities/AccountGameUser';
import Perference from '@modules/categoriesgames/infra/typeorm/entities/Preference';
import CategoryGameUser from '@modules/categoriesgames/infra/typeorm/entities/Preference';
import ChatUser from '@modules/chat/infra/typeorm/entities/ChatUser';
import Post from '@modules/posts/infra/typeorm/entities/Post';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import FriendRequest from './FriendRequest';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  birth_date: string;

  @Column({ type: 'text', nullable: true })
  url_profile_photo: string;

  @Column({ type: 'text', nullable: true })
  url_banner_photo: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(
    () => FriendRequest,
    (friend_requests) => friend_requests.userRequester,
  )
  friendRequests: FriendRequest[];

  @OneToMany(
    () => AccountGameUser,
    (account_games_users) => account_games_users.user,
  )
  account_games_users: AccountGameUser[];

  @OneToMany(() => Perference, (preferences) => preferences.user)
  preferences: Perference[];

  @OneToMany(() => ChatUser, (chat_users) => chat_users.user_request, {
    cascade: true,
  })
  chats: ChatUser[];

  @ManyToMany(() => User, (user) => user, {
    cascade: true,
  })
  @JoinTable({ name: 'friends' })
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
