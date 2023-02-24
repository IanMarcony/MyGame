import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

import FilePost from './FilePost';
import CommentUser from './CommentUser';
import InteractionUser from './InteractionUser';

@Entity('posts')
export default class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean' })
  is_private: boolean;

  @Column({ type: 'integer', default: 0 })
  count_likes: number;

  @Column()
  id_user: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => FilePost, (filePost) => filePost.post, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  filesPost: FilePost[];

  @OneToMany(() => CommentUser, (coments_users) => coments_users.post, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  coments: CommentUser[];

  @OneToMany(
    () => InteractionUser,
    (interactions_users) => interactions_users.post,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  interactions: InteractionUser[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
