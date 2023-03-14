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

@Entity('files_post')
export default class FilePost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  filename: string;

  @Column({ type: 'varchar' })
  type: string;

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

