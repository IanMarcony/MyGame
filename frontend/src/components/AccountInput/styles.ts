import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  display: flex;

  flex-direction: column;

  align-items: center;

  & + & {
    margin-top: 15px;
  }

  img {
    width: 100px;
    object-fit: cover;
    margin-bottom: 5px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    background-color: var(--background-color);
    border-radius: 10px;
    border: 2px solid #232129;
    padding: 16px;
    color: var(--text-color);
    &::placeholder {
      color: var(--text-color);
    }
  }
`;
