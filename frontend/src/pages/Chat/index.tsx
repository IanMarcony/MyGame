import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, intervalToDuration, parseISO } from 'date-fns';
import TextAreaInput from '../../components/TextAreaInput';
import { useAuth } from '../../hooks/auth';

import {
  ChatHeader,
  Container,
  MessageCard,
  MessagesArea,
  SendMessageArea,
  UserImageArea,
} from './styles';

import UserIcon from '../../assets/user.png';

interface IMessageData {
  id: number;
  text: string;
  email: string;
  created_at: string;
}

interface IChatMetadata {
  profile_photo?: string;
  name: string;
  email: string;
}

const Chat: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [chatMetadata, setChatMetadata] = useState<IChatMetadata>(
    {} as IChatMetadata,
  );
  const [messages, setMessages] = useState<IMessageData[]>([]);

  const verifyLastDateMessage = useCallback((message_date: string) => {
    const result = intervalToDuration({
      start: new Date(),
      end: new Date(message_date),
    });

    const { days } = result;

    if (days && days > 0) {
      return format(parseISO(message_date), 'dd/MM');
    }
    return format(parseISO(message_date), 'HH:mm');
  }, []);

  const handleSubmit = useCallback(async () => {}, []);

  return (
    <Container>
      <ChatHeader to={`/dashboard/profile/${chatMetadata.email}`}>
        <UserImageArea>
          <img
            src={
              chatMetadata.profile_photo
                ? `${process.env.REACT_APP_API_URL}/files/${chatMetadata.profile_photo}`
                : UserIcon
            }
            alt={chatMetadata.name}
          />
        </UserImageArea>

        {chatMetadata.name}
      </ChatHeader>
      <MessagesArea>
        {messages.map((item) => (
          <MessageCard key={item.id} isSelfMessage={item.email === user.email}>
            {item.text}
            <span>{verifyLastDateMessage(item.created_at)}</span>
          </MessageCard>
        ))}
      </MessagesArea>
      <SendMessageArea onSubmit={handleSubmit}>
        <TextAreaInput
          rows={4}
          placeholder="Digite alguma coisa"
          name="message"
        />
        <button type="submit">Enviar</button>
      </SendMessageArea>
    </Container>
  );
};

export default Chat;
