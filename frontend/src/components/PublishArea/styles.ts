import { Form } from '@unform/web';

import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  width: 45%;
  display: flex;

  flex-direction: column;
`;

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Content = styled(Form)`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  animation: ${appearFromLeft} 1s;
  width: 100%;

  > div {
    margin-bottom: 10px;
  }

  button {
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    margin-top: 12px;

    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }

  .MuiInputBase-root {
    width: max-content;
    height: 35px;
    border: 1px solid #232129;
    color: var(--text-color);
  }

  .MuiSelect-select {
    display: flex;
    align-items: center;
    svg {
      margin-right: 5px;
    }
  }

  .MuitMenuItem-root {
    display: flex;
    align-items: center;
    svg {
      margin-right: 5px;
    }
  }
`;

export const AddPostButton = styled.button`
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px;
  width: max-content;
  font-size: 12px;
`;

export const DropFilesArea = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: var(--text-color);
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const CarrouselFiles = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
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
  max-width: 35px;
  height: 35px;
  top: 25%;
  padding: 10px;
  left: 0;
  border-radius: 50%;
  z-index: 10;
`;

export const ButtonCarrouselNext = styled.button`
  position: absolute;
  max-width: 35px;
  height: 35px;
  padding: 10px;
  top: 25%;
  left: 95%;
  border-radius: 50%;
  z-index: 10;
`;

export const ItemCarrousel = styled.div`
  scroll-snap-align: start;
  flex: none;
  min-width: 100%;
  height: 100%;
  padding: 14px;
  position: relative;

  button {
    margin: 0;
    top: 5px;
    position: absolute;
    max-width: 30px;
    height: 30px;
    padding: 10px;
    border-radius: 50%;
  }

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
