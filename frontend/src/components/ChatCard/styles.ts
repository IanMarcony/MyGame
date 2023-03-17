import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled(Link)`
  border-radius: 10px;
  background-color: var(--background-secondary-color);
  padding: 10px;
  display: flex;
  height: 80px;
  align-items: center;
  text-decoration: none;
  color: var(--text-color);
  & + & {
    margin-top: 12px;
  }
`;

export const UserImageArea = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid var(--text-color);
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Content = styled.div`
  width: 50%;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h1 {
    max-width: 40%;
    text-overflow: ellipsis;
    font-size: 18px;
  }
`;

export const LastMessageChatArea = styled.div`
  width: 100%;
  display: flex;
  span {
    display: inline-block;
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 5px;
  }
`;
