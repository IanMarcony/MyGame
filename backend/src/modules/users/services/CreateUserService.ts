import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/interfaces/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
}
@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ name, email, cpf, password }: IRequest): Promise<User> {
    const [checkUserExist, checkCPFExist] = await Promise.all([
      await this.usersRepository.findByEmail(email),
      await this.usersRepository.findByCPF(cpf),
    ]);

    if (checkUserExist) {
      throw new AppError('Email address already exists');
    }

    if (checkCPFExist) {
      throw new AppError('CPF already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
