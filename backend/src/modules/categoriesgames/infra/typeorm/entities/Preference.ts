import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import CategoryGame from './CategoryGame';

@Entity('preferences')
export default class Preference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_category_game: number;

  @Column()
  id_user: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => CategoryGame)
  @JoinColumn({ name: 'id_category_game' })
  account_game: CategoryGame;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
