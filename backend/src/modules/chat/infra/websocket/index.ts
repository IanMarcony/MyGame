import CreateMessageService from '@modules/chat/services/CreateMessageService';
import User from '@modules/users/infra/typeorm/entities/User';
import { io } from '@shared/infra/http/http';
import Utils from '@shared/utils/Utils';
import { container } from 'tsyringe';

interface ISelectRoom {
  token: string;
  user: User;
}

interface IMessageRequest {
  text: string;
  id_chat: number;
  chat_token: string;
  token: string;
}

interface RoomUser {
  socket_id: string;
  user: User;
  room: string;
}

const usersConnected: RoomUser[] = [];

io.on('connection', (socket) => {
  socket.on('select_room', ({ token, user }: ISelectRoom) => {
    socket.join(token);

    const userInRoom = usersConnected.find(
      (userConnected) =>
        userConnected.user.name === user.name && token === userConnected.room,
    );

    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      usersConnected.push({
        room: token,
        user,
        socket_id: socket.id,
      });
    }
  });

  socket.on(
    'message',
    async ({ id_chat, text, token, chat_token }: IMessageRequest) => {
      const utils = new Utils();
      const { id: id_user } = utils.verifyToken(token);

      const createMessage = container.resolve(CreateMessageService);

      const message = await createMessage.execute({
        id_chat,
        id_user,
        text,
      });

      io.to(chat_token).emit('message', message);
    },
  );
});
