import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ChatUser from '../infra/typeorm/entities/ChatUser';
import IChatsRepository from '../repositories/IChatsRepository';

interface IRequest {
  id_user_receiver: number;
  id_user: number;
}

@injectable()
export default class CreateChatService {
  constructor(
    @inject('ChatsRepository')
    private chatsRepository: IChatsRepository,
  ) {}

  async execute({ id_user, id_user_receiver }: IRequest): Promise<ChatUser> {
    const chatExists = await this.chatsRepository.findByIdUserAndIdUserReceiver(
      id_user,
      id_user_receiver,
    );

    if (chatExists) {
      return chatExists;
    }

    const { id } = await this.chatsRepository.create({
      id_user_receiver,
      id_user,
    });

    const chat = await this.chatsRepository.findById(id);

    if (!chat) {
      throw new AppError('Erro to create chat', 400);
    }

    delete chat.user_receiver.password;
    delete chat.user_receiver.id;
    delete chat.user_receiver.url_banner_photo;
    delete chat.user_receiver.birth_date;
    delete chat.user_receiver.description;
    delete chat.user_receiver.created_at;
    delete chat.user_receiver.updated_at;

    delete chat.user_request.password;
    delete chat.user_request.id;
    delete chat.user_request.url_banner_photo;
    delete chat.user_request.birth_date;
    delete chat.user_request.description;
    delete chat.user_request.created_at;
    delete chat.user_request.updated_at;

    return chat;
  }
}
