import CreateChatService from '@modules/chat/services/CreateChatService';
import SearchChatService from '@modules/chat/services/SearchChatService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ChatsRepository from '../../typeorm/repositories/ChatsRepository';

export default class ChatController {
  public async index(req: Request, res: Response): Promise<Response> {
    const chatsRepository = new ChatsRepository();
    const { id: id_user } = req.user;

    const chats = await chatsRepository.findAll(id_user);

    return res.status(200).json(chats);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id_user_receiver } = req.body;
    const { id: id_user } = req.user;

    const createChat = container.resolve(CreateChatService);

    const chat = await createChat.execute({
      id_user_receiver,
      id_user,
    });

    return res.status(201).json(chat);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { token } = req.params;
    const { id: id_user } = req.user;

    const searchChat = container.resolve(SearchChatService);

    const chat = await searchChat.execute({
      token,
      id_user,
    });

    return res.status(200).json(chat);
  }
}
