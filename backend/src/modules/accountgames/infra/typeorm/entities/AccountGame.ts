import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('account_games')
export default class AccountGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  url_icon: string;

  @Column({ type: 'text' })
  company: string;

  @Column({ type: 'integer' })
  value_number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
