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
import Image from './Image';
import Video from './Video';
import ComentUser from './ComentUser';

@Entity('posts')
export default class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean' })
  is_private: boolean;

  @Column({ type: 'integer' })
  count_likes: number;

  @Column()
  id_user: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => Video, (video) => video.post)
  videos: Video[];

  @OneToMany(() => Image, (image) => image.post)
  images: Image[];

  @OneToMany(() => ComentUser, (coments_users) => coments_users.post)
  coments: ComentUser[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
