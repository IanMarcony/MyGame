import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByCPF(cpf: string): Promise<User | null>;
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
  delete(user: User): Promise<void>;
}
