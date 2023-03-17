import React, { useEffect, useCallback, useState } from 'react';
import ChatCard from '../../components/ChatCard';

import { Container, Content } from './styles';

interface IChat {
  profile_photo?: string;
  name_chat: string;
  last_message: string;
  last_message_date: string;
  chat_id: string;
}

const ListChats: React.FC = () => {
  const [chats, setChats] = useState<IChat[]>([]);

  const handleListChats = useCallback(async () => {}, []);

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
