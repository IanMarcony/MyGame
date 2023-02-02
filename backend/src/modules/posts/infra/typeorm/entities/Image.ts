import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Post from './Post';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  url_image: string;

  @Column()
  id_post: number;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'id_post' })
  post: Post;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
