import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('friends')
export default class Friend {
  @PrimaryColumn({ name: 'usersId_1', type: 'int' })
  id_user: number;

  @Column({ name: 'usersId_2', type: 'int' })
  id_friend: number;
}
