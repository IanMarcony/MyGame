import AccountGameUser from '@modules/accountgames/infra/typeorm/entities/AccountGameUser';
import CategoryGameUser from '@modules/categoriesgames/infra/typeorm/entities/CategoryGameUser';
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

  @Column({ type: 'datetime' })
  bith_date: Date;

  @Column({ type: 'text' })
  url_profile_photo: string;

  @Column({ type: 'text' })
  url_banner_photo: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(
    () => AccountGameUser,
    (account_games_users) => account_games_users.user,
  )
  account_games_users: AccountGameUser[];

  @OneToMany(
    () => CategoryGameUser,
    (categories_game_users) => categories_game_users.user,
  )
  categories_game_users: CategoryGameUser[];

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
