import ICreateMessageChatDTO from '@modules/chat/dtos/ICreateMessageChatDTO';
import IMessagesRepository from '@modules/chat/repositories/IMessagesRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';

import Message from '../entities/Message';
import Constants from '@shared/utils/Contants';

interface IMessagePage {
  messages: Message[];
  count: number;
}

export default class MessagesRepository implements IMessagesRepository {
  private ormRepository: Repository<Message>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Message);
  }

  public async findMessagesByPage(
    id_chat: number,
    page = 1,
  ): Promise<IMessagePage> {
    const take = Constants.limitPostPerPage;
    const skip = (page - 1) * take;

    const [messages, count] = await this.ormRepository.findAndCount({
      take,
      skip,
      order: { created_at: 'DESC' },
      where: {
        id_chat,
      },
      relations: {
        user: true,
      },
    });

    return {
      messages,
      count,
    };
  }

  public async createMessage(data: ICreateMessageChatDTO): Promise<Message> {
    const message = this.ormRepository.create(data);

    return await this.ormRepository.save(message);
  }
}
