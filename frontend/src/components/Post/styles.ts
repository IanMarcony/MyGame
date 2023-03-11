import { Form } from '@unform/web';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  padding-top: 25px;
  border-radius: 10px;
  background-color: var(--background-secondary-color);
`;

export const CarrouselFiles = styled.div`
  display: flex;
  width: 100%;
  height: 300px;

  margin-bottom: 15px;
  overflow-y: hidden;
  overflow-x: hidden;

  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

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

  scroll-behavior: smooth;
`;

export const ButtonCarrouselPrev = styled.button`
  position: absolute;
  width: 35px;
  height: 35px;
  top: 35%;
  padding: 10px;
  left: 1%;
  border-radius: 50%;
`;

export const ButtonCarrouselNext = styled.button`
  position: absolute;
  width: 35px;
  height: 35px;
  padding: 10px;
  top: 35%;

  left: 93%;
  border-radius: 50%;
`;

export const ItemCarrousel = styled.div`
  scroll-snap-align: start;
  flex: none;
  min-width: 100%;
  height: 100%;
  padding: 14px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }

  video {
    width: 100%;
    height: 100%;

    object-fit: contain;
  }
`;

export const ActionsPostArea = styled.div`
  border-top: 1px solid var(--background-color);
  border-bottom: 1px solid var(--background-color);
  width: 100%;
  margin-top: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  button {
    background-color: var(--background-color);
    border-radius: 50%;
    padding: 5px;
    width: max-content;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const InfoPost = styled.div`
  font-size: 12px;
  margin-bottom: 5px;

  span + span {
    margin-left: 10px;
  }
`;

export const ActionsButtonArea = styled.div`
  display: flex;

  button + button {
    margin-left: 10px;
  }
`;

export const UserInfoArea = styled(Link)`
  background: transparent;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-color);
  width: 100%;
  margin-bottom: 10px;

  .MuiAvatar-root {
    margin-right: 10px;
  }
`;

export const CommentsArea = styled.div`
  margin-top: 5px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 6px;
  border-radius: 10px;
  background-color: var(--background-color);
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 10px;
  }

  scroll-behavior: smooth;
  max-height: 140px;
`;

export const CommentItem = styled.div`
  background-color: var(--background-secondary-color);
  max-width: max-content;
  height: max-content;
  border-radius: 10px;
  padding: 10px 12px;
  & + & {
    margin-top: 10px;
  }
  p {
    width: 100%;
    word-break: break-all;
    text-align: justify;
  }

  section {
    display: flex;

    button {
      margin-left: 10px;
      border-radius: 10px;
      height: 100%;
      padding: 3px;

      transition: opacity 0.2s;

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;

export const UserInfoCommentArea = styled(Link)`
  background: transparent;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-color);
  width: 100%;
  margin-bottom: 10px;

  .MuiAvatar-root {
    margin-right: 10px;
  }
`;

export const AddCommentArea = styled(Form)`
  margin-top: 10px;
  display: flex;
  align-items: center;

  button {
    border-radius: 10px;
    width: 50px;
    height: 50px;
    margin-left: 5px;
  }
`;
