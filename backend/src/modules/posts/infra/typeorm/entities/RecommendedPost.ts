import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Post from './Post';

@Entity('recommended_posts')
export default class RecommendedPost {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  id_user: number;

  @Column()
  id_post: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToOne(() => Post)
  @JoinColumn({ name: 'id_post' })
  post: Post;

  @CreateDateColumn()
  created_at: Date;
}
