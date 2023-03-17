import React, { useCallback } from 'react';

import { format, intervalToDuration, parseISO } from 'date-fns';

import UserIcon from '../../assets/user.png';

import {
  Container,
  Content,
  LastMessageChatArea,
  UserImageArea,
} from './styles';

interface IContentChat {
  profile_photo?: string;
  name_chat: string;
  last_message?: string;
  last_message_date?: string;
  chat_id: string;
}

interface ChatCardProps {
  content: IContentChat;
}

const ChatCard: React.FC<ChatCardProps> = ({ content }) => {
  const verifyLastDateMessage = useCallback((last_message_date: string) => {
    const result = intervalToDuration({
      start: new Date(),
      end: new Date(last_message_date),
    });

    const { years, days, months, seconds, hours, minutes } = result;

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
        {content.last_message && content.last_message_date && (
          <LastMessageChatArea>
            <span>{content.last_message}</span>
            {verifyLastDateMessage(content.last_message_date)}
          </LastMessageChatArea>
        )}
      </Content>
    </Container>
  );
};

export default ChatCard;
