import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ActionUser from './ActionUser';
import Post from './Post';

Entity('interactions_users');
export default class InteractionUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_post: number;

  @Column()
  id_action_user: number;

  @Column()
  id_user: number;

  @ManyToOne(() => ActionUser)
  @JoinColumn({ name: 'id_action_user' })
  action_user: ActionUser;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'id_post' })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
