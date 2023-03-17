import ICreateMessageChatDTO from '../dtos/ICreateMessageChatDTO';
import Message from '../infra/typeorm/entities/Message';

interface IMessagePage {
  messages: Message[];
  count: number;
}

export default interface IMessagesRepository {
  findMessagesByPage(id_chat: number, page: number): Promise<IMessagePage>;
  createMessage(data: ICreateMessageChatDTO): Promise<Message>;
}
