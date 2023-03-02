import { Column, Entity } from 'typeorm';

@Entity('friends')
export default class Friend {
  @Column({ name: 'usersId_1', type: 'int' })
  id_user: number;

  @Column({ name: 'usersId_2', type: 'int' })
  id_friend: number;
}
