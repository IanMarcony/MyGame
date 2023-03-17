import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format, intervalToDuration, parseISO } from 'date-fns';
import { Waypoint } from 'react-waypoint';
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
import api from '../../services/api';

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
  id_chat: number;
}

interface ISubmitData {
  message: string;
}

const Chat: React.FC = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [chatMetadata, setChatMetadata] = useState<IChatMetadata>(
    {} as IChatMetadata,
  );
  const navigate = useNavigate();
  const [messages, setMessages] = useState<IMessageData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const handleLoadMessages = useCallback(async () => {
    if (loading) {
      return;
    }
    if (total > 0 && messages.length === total) {
      return;
    }
    setLoading(true);

    const { data } = await api.get(`/chats/messages/${id}`, {
      params: { page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { count, messages: newMessages } = data;

    setMessages([...messages, ...newMessages]);
    setTotal(count);
    setLoading(false);
  }, [id, loading, messages, page, token, total]);

  const verifyLoadMessages = useCallback(() => {
    if (loading) {
      return;
    }
    if (total > 0 && messages.length === total) {
      return;
    }
    setPage(page + 1);
  }, [loading, messages.length, page, total]);

  const handleSubmit = useCallback(
    async (data: ISubmitData) => {
      if (data.message.trim().length === 0) {
        return;
      }

      const { data: message } = await api.post(
        '/chats/messages',
        {
          text: data.message,
          id_chat: chatMetadata.id_chat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMessages((old) => [
        {
          ...message,
          email: user.email,
        },
        ...old,
      ]);
    },
    [chatMetadata.id_chat, token, user.email],
  );

  const handleGetChat = useCallback(async () => {
    try {
      const { data } = await api.get(`/chats/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const chat_user =
        data.user_receiver.email !== user.email
          ? data.user_receiver
          : data.user_request;

      setChatMetadata({
        email: chat_user.email,
        name: chat_user.name,
        profile_photo: chat_user.url_profile_photo,
        id_chat: data.id_chat,
      });
    } catch (error) {
      navigate('/dashboard/chat');
    }
  }, [id, token, user.email, navigate]);

  useEffect(() => {
    handleGetChat();
  }, [id]);

  useEffect(() => {
    handleLoadMessages();
  }, [page]);

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
        {messages.reverse().map((item, index) => (
          <>
            <MessageCard
              key={item.id}
              isSelfMessage={item.email === user.email}
            >
              {item.text}
              <span>{verifyLastDateMessage(item.created_at)}</span>
            </MessageCard>
            {index === messages.length - messages.length * 0.5 && (
              <Waypoint onEnter={() => verifyLoadMessages()} />
            )}
          </>
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
