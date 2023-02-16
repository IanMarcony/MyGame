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
  overflow-x: auto;

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
