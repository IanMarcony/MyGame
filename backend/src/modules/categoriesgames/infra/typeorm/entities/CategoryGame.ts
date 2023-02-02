import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories_games')
export default class CategoryGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  type_category: string;

  @Column({ type: 'text' })
  value: string;

  @Column({ type: 'int' })
  value_number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
