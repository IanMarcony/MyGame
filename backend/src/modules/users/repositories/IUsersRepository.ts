import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findById(id: number): Promise<User | null>;
  findByName(name: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailWithFullProfile(email: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
  delete(user: User): Promise<void>;
}
