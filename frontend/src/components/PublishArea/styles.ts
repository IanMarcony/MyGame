import { Form } from '@unform/web';

import styled from 'styled-components';

export const Container = styled(Form)`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 45%;
  max-height: 300px;

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
