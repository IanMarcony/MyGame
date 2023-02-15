import styled from 'styled-components';

export const Container = styled.div``;

export const CarrouselFiles = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
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
  max-width: 35px;
  height: 35px;
  top: 25%;
  left: 27%;
  border-radius: 50%;
`;

export const ButtonCarrouselNext = styled.button`
  position: absolute;
  position: absolute;
  max-width: 35px;
  height: 35px;
  top: 25%;
  left: 71%;
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
