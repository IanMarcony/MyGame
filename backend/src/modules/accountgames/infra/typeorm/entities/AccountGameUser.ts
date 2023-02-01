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
import AccountGame from './AccountGame';

@Entity('account_games_users')
export default class AccountGameUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  username: string;

  @Column()
  id_account_game: number;

  @Column()
  id_user: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToOne(() => AccountGame)
  @JoinColumn({ name: 'id_account_game' })
  account_game: AccountGame;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
