import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';

@Entity('friend_requests')
export default class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user_requester: number; //Quem solicita

  @Column()
  id_user_required: number; //Quem é solicitado

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user_requester' })
  userRequester: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user_required' })
  userRequired: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
