import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

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
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }

  .MuiTextField-root {
    width: 100%;
    fieldset {
      border: 0;
    }
    label {
      color: var(--text-color);
    }
    .MuiSvgIcon-root {
      color: var(--text-color);
    }
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    &::placeholder {
      color: var(--text-color);
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background-color: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
