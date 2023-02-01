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
import Post from './Post';

@Entity('videos')
export default class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  url_video: string;

  @Column()
  id_post: number;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'id_post' })
  post: Post;

  @OneToMany(() => Video, (video) => video.post)
  videos: Video[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
