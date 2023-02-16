import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: var(--background-color);
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  color: var(--text-color);
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-color: var(--text-secondary-color);
      color: var(--text-secondary-color);
    `}
  ${(props) =>
    props.isFilled &&
    css`
      color: var(--text-secondary-color);
    `}
  & + div {
    margin-top: 8px;
  }
  textarea {
    flex: 1;
    max-height: 300px;
    background: transparent;
    border: 0;
    color: #f4ede8;
    resize: none;
    overflow-y: auto;
    &::placeholder {
      color: var(--text-color);
    }
    &::-webkit-scrollbar {
      width: 10px;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  }
  svg {
    margin-right: 16px;
  }
`;
