import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 10px;
  background-color: var(--background-secondary-color);
  height: max-content;
  padding: 10px;
  display: flex;
  align-items: center;
`;

export const UserImageArea = styled.div`
  width: 80px;
  height: 80px;
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
  width: 100%;
  margin-left: 10px;
  display: flex;

  span {
    max-width: 60%;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }

  strong {
    font-weight: 700;
  }
`;

export const ActionsButtonsArea = styled.div`
  margin-left: auto;
  button + button {
    margin-left: 10px;
  }

  button {
    border-radius: 50%;
    padding: 5px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }
`;
