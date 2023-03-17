import React, { useCallback, useEffect, useState } from 'react';

import { format, intervalToDuration, parseISO } from 'date-fns';

import UserIcon from '../../assets/user.png';

import {
  Container,
  Content,
  LastMessageChatArea,
  UserImageArea,
} from './styles';
import socket from '../../services/socket';
import { useAuth } from '../../hooks/auth';

interface IContentChat {
  profile_photo?: string;
  name_chat: string;
  last_message?: string;
  last_message_date?: string;
  chat_id: string;
}

interface ILastMessage {
  text: string;
  created_at: string;
}

interface ChatCardProps {
  content: IContentChat;
}

const timoutId: any = 0;

const ChatCard: React.FC<ChatCardProps> = ({ content }) => {
  const [lastMessage, setLastMessage] = useState(content.last_message);
  const [lastMessageAux, setLastMessageAux] = useState(content.last_message);
  const [lastMessageDate, setLastMessageDate] = useState(
    content.last_message_date,
  );
  const [lastMessageDateAux, setLastMessageDateAux] = useState(
    content.last_message_date,
  );

  const { user } = useAuth();

  const verifyLastDateMessage = useCallback((last_message_date: string) => {
    const result = intervalToDuration({
      start: new Date(),
      end: new Date(last_message_date),
    });

    const { years, days, months, hours, minutes } = result;

    if (years && years > 0) {
      if (years === 1) {
        return `Há 1 ano`;
      }
      return `Há ${years} anos`;
    }
    if ((months && months > 0) || (days && days > 2)) {
      return format(parseISO(last_message_date), 'dd/MM');
    }

    if (days && days === 1) {
      return `Ontem às ${format(parseISO(last_message_date), 'HH:mm')}`;
    }

    if (days && days === 0) {
      if (hours && hours === 0 && minutes && minutes === 0) {
        return 'Agora';
      }
    }
    return format(parseISO(last_message_date), 'HH:mm');
  }, []);

  const handleTypingResponse = useCallback(
    (data: ILastMessage) => {
      if (data.text.length === 0) {
        setLastMessage(lastMessageAux);
      } else {
        setLastMessage(data.text);
      }
    },
    [lastMessageAux],
  );

  const handleSelectRoom = useCallback(() => {
    socket.emit('select_room', {
      token: content.chat_id,
      user,
    });
  }, [content.chat_id, user]);

  useEffect(() => {
    handleSelectRoom();
    socket.on('chatTyping', handleTypingResponse);

    return () => {
      socket.off('chatTyping', handleTypingResponse);
    };
  }, []);

  return (
    <Container to={`/dashboard/chat/${content.chat_id}`}>
      <UserImageArea>
        <img
          src={
            content.profile_photo
              ? `${process.env.REACT_APP_API_URL}/files/${content.profile_photo}`
              : UserIcon
          }
          alt={content.name_chat}
        />
      </UserImageArea>
      <Content>
        <h1>{content.name_chat}</h1>
        {lastMessage && lastMessageDate && (
          <LastMessageChatArea>
            <span>{lastMessage}</span>
            {verifyLastDateMessage(lastMessageDate)}
          </LastMessageChatArea>
        )}
      </Content>
    </Container>
  );
};

export default ChatCard;
