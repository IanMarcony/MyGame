import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Message from '../infra/typeorm/entities/Message';
import IChatsRepository from '../repositories/IChatsRepository';
import IMessagesRepository from '../repositories/IMessagesRepository';

interface IRequest {
  id_chat: number;
  text: string;
  id_user: number;
}

@injectable()
export default class CreateMessageService {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: IMessagesRepository,
  ) {}

  async execute({ id_user, id_chat, text }: IRequest): Promise<Message> {
    const message = await this.messagesRepository.createMessage({
      id_chat,
      id_user,
      text,
    });

    return message;
  }
}
