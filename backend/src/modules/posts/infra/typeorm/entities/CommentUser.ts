import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from './Post';

@Entity('coments_users')
export default class CommentUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column()
  id_post: number;

  @Column()
  id_user: number;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'id_post' })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
