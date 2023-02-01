import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Message from './Message';

@Entity('chats')
export default class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  token: string;

  @OneToMany(() => Message, (message) => message.chat, {
    cascade: true,
  })
  messages: Message[];

  @CreateDateColumn()
  created_at: Date;
}
