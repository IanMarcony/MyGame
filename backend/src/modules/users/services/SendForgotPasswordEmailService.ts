import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email address does not exist');
    }

    await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(email, 'recover your password');
  }
}
