import ICreateChatDTO from '../dtos/ICreateChatDTO';
import Chat from '../infra/typeorm/entities/Chat';
import ChatUser from '../infra/typeorm/entities/ChatUser';

export default interface IChatsRepository {
  findAll(id_user: number): Promise<ChatUser[]>;
  findById(id: number): Promise<ChatUser | null>;
  findByIdChat(id_chat: number): Promise<ChatUser | null>;
  findByIdUser(id_user: number): Promise<ChatUser | null>;
  findByToken(token: string): Promise<Chat | null>;
  findByIdUserAndIdUserReceiver(
    id_user: number,
    id_user_receiver: number,
  ): Promise<ChatUser | null>;
  create(data: ICreateChatDTO): Promise<ChatUser>;
}
