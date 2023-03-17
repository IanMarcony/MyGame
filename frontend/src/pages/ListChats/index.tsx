import React, { useEffect, useCallback, useState } from 'react';
import ChatCard from '../../components/ChatCard';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container, Content } from './styles';

interface IChat {
  profile_photo?: string;
  name_chat: string;
  last_message?: string;
  last_message_date?: string;
  chat_id: string;
}

interface IMessage {
  text: string;
  created_at: string;
}

interface IChatList {
  user_receiver: {
    email: string;
    name: string;
    url_profile_photo: string;
  };
  user_request: {
    email: string;
    name: string;
    url_profile_photo: string;
  };
  chat: {
    token: string;
    messages: IMessage[];
  };
}

const ListChats: React.FC = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const { token, user } = useAuth();

  const handleListChats = useCallback(async () => {
    const { data: chatsList } = await api.get('/chats', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setChats(
      chatsList.map((item: IChatList) => {
        const chat_user =
          item.user_receiver.email !== user.email
            ? item.user_receiver
            : item.user_request;

        return {
          profile_photo: chat_user.url_profile_photo,
          name_chat: chat_user.name,
          last_message: item.chat.messages[0]?.text,
          last_message_date: item.chat.messages[0]?.created_at,
          chat_id: item.chat.token,
        };
      }),
    );
  }, [token, user.email]);

  useEffect(() => {
    handleListChats();
  }, []);

  return (
    <Container>
      <h1>Suas conversas</h1>
      {chats.length === 0 ? (
        <h2>Sem conversas no momento</h2>
      ) : (
        <Content>
          {chats.map((item) => (
            <ChatCard key={item.chat_id} content={item} />
          ))}
        </Content>
      )}
    </Container>
  );
};

export default ListChats;
