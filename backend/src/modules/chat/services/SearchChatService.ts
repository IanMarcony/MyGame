import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ChatUser from '../infra/typeorm/entities/ChatUser';
import IChatsRepository from '../repositories/IChatsRepository';

interface IRequest {
  token: string;
  id_user: number;
}

@injectable()
export default class SearchChatService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepository,
  ) {}

  async execute({ id_user, token }: IRequest): Promise<ChatUser> {
    const chat = await this.chatsRepository.findByToken(token);

    if (!chat) {
      throw new AppError('Erro to find chat', 400);
    }
    const chatUser = await this.chatsRepository.findByIdChat(chat.id);

    if (!chatUser) {
      throw new AppError('Erro to find chat', 400);
    }

    if (
      chatUser.id_user_receiver !== id_user &&
      chatUser.id_user_request !== id_user
    ) {
      throw new AppError('Erro to find chat', 400);
    }

    delete chatUser.user_receiver.password;
    delete chatUser.user_receiver.id;
    delete chatUser.user_receiver.url_banner_photo;
    delete chatUser.user_receiver.birth_date;
    delete chatUser.user_receiver.description;
    delete chatUser.user_receiver.created_at;
    delete chatUser.user_receiver.updated_at;

    delete chatUser.user_request.password;
    delete chatUser.user_request.id;
    delete chatUser.user_request.url_banner_photo;
    delete chatUser.user_request.birth_date;
    delete chatUser.user_request.description;
    delete chatUser.user_request.created_at;
    delete chatUser.user_request.updated_at;

    return chatUser;
  }
}
