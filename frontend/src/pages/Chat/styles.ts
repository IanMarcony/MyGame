import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface IMessageCardProps {
  isSelfMessage?: boolean;
}

export const Container = styled.div`
  width: 60%;
  height: 85vh;
  margin: 0 auto;
  margin-top: 10px;
  background-color: var(--background-secondary-color);
  border-radius: 10px;
  color: var(--text-color);
`;

export const ChatHeader = styled(Link)`
  width: 100%;
  height: 12%;
  padding: 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-color);
  border-bottom: 1px solid var(--text-color);
`;

export const UserImageArea = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 50%;
  border: 1px solid var(--text-color);
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MessagesArea = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: calc(100% - 20% - 12%);
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;

export const MessageCard = styled.div<IMessageCardProps>`
  display: flex;
  flex-direction: column;
  width: 45%;
  height: max-content;
  word-wrap: break-word;
  ${(props) =>
    props.isSelfMessage
      ? css`
          margin-left: auto;
        `
      : css`
          margin-right: auto;
        `}
  padding: 5px;
  text-align: justify;
  border-radius: 10px;
  background-color: var(--background-color);
  & + & {
    margin-bottom: 10px;
  }
  span {
    font-size: 12px;
    margin-left: auto;
  }
`;

export const SendMessageArea = styled(Form)`
  width: 100%;
  height: 20%;
  display: flex;
  padding: 10px;
  border-top: 1px solid var(--text-color);

  button {
    margin-left: 5px;
    border-radius: 10px;
    padding: 5px;

    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const NotificationTypingArea = styled.span`
  display: inline-block;
  max-width: 200px;
  text-overflow: ellipsis;
  word-wrap: normal;
`;
