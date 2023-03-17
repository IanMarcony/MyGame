import CreateMessageService from '@modules/chat/services/CreateMessageService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ChatsRepository from '../../typeorm/repositories/ChatsRepository';
import MessagesRepository from '../../typeorm/repositories/MessagesRepository';

export default class MessageController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id_chat, text } = req.body;
    const { id: id_user } = req.user;

    const createMessage = container.resolve(CreateMessageService);

    const message = await createMessage.execute({
      id_chat,
      id_user,
      text,
    });

    return res.status(201).json(message);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { page } = req.query;
    const { token } = req.params;

    const chatsRespository = new ChatsRepository();
    const chat = await chatsRespository.findByToken(token as string);
    const messageRepository = new MessagesRepository();

    const messages = await messageRepository.findMessagesByPage(
      chat?.id,
      parseInt(page as string),
    );

    for (const message of messages.messages) {
      Object.assign(message, { email: message.user.email });

      delete message.user;
    }

    return res.status(200).json(messages);
  }
}
