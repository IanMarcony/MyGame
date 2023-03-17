import ICreateChatDTO from '@modules/chat/dtos/ICreateChatDTO';
import IChatsRepository from '@modules/chat/repositories/IChatsRepository';
import { AppDataSource } from 'data-source';
import { Repository } from 'typeorm';
import Chat from '../entities/Chat';
import ChatUser from '../entities/ChatUser';

export default class ChatsRepository implements IChatsRepository {
  private ormChatUserRepository: Repository<ChatUser>;
  private ormChatRepository: Repository<Chat>;

  constructor() {
    this.ormChatUserRepository = AppDataSource.getRepository(ChatUser);
    this.ormChatRepository = AppDataSource.getRepository(Chat);
  }
  public async findByIdChat(id_chat: number): Promise<ChatUser | null> {
    return await this.ormChatUserRepository.findOne({
      where: {
        id_chat,
      },
      relations: {
        chat: true,
        user_receiver: true,
        user_request: true,
      },
    });
  }
  public async findByIdUser(id_user: number): Promise<ChatUser | null> {
    throw new Error('Method not implemented.');
  }

  public async findByToken(token: string): Promise<Chat | null> {
    return await this.ormChatRepository.findOne({
      where: {
        token,
      },
    });
  }

  public async findAll(id_user: number): Promise<ChatUser[]> {
    const chats = await this.ormChatUserRepository.find({
      where: [{ id_user_receiver: id_user }, { id_user_request: id_user }],
      relations: {
        chat: {
          messages: true,
        },
        user_receiver: true,
        user_request: true,
      },
    });

    for (const chat of chats) {
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
    }

    return chats;
  }

  public async findById(id: number): Promise<ChatUser | null> {
    const chats = await this.ormChatUserRepository.findOne({
      where: { id },
      relations: {
        chat: true,
        user_request: true,
        user_receiver: true,
      },
    });

    return chats;
  }

  public async findByIdUserAndIdUserReceiver(
    id_user: number,
    id_user_receiver: number,
  ): Promise<ChatUser | null> {
    const chats = await this.ormChatUserRepository.findOne({
      where: [
        { id_user_receiver: id_user, id_user_request: id_user_receiver },
        { id_user_receiver: id_user_receiver, id_user_request: id_user },
      ],
      relations: {
        chat: true,
      },
    });

    return chats;
  }

  public async create({
    id_user_receiver,
    id_user,
  }: ICreateChatDTO): Promise<ChatUser> {
    const newChat = this.ormChatRepository.create();
    const chat = await this.ormChatRepository.save(newChat);

    const newChatUser = await this.ormChatUserRepository.create({
      id_user_request: id_user,
      id_user_receiver,
      id_chat: chat.id,
    });

    return await this.ormChatUserRepository.save(newChatUser);
  }
}
