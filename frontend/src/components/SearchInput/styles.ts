import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--background-color);
  border-radius: 10px;
  padding: 10px;
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
    cursor: pointer;
  }
`;

export const ResultContainer = styled.div`
  background-color: var(--background-secondary-color);
  padding: 5px;
  position: absolute;

  top: 55px;
  width: 300px;
  max-height: 95px;
  overflow-y: auto;
  overflow-x: hidden;

  -webkit-box-shadow: -1px 3px 5px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 3px 5px 1px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 3px 5px 1px rgba(0, 0, 0, 0.75);

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

  li + li {
    margin-top: 5px;
  }

  li {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 100%;
    border: 2px solid #232129;
    padding: 10px;

    transition: opacity 0.2s;
    &:hover {
      &:hover {
        opacity: 0.5;
      }
    }

    .MuiAvatar-root {
      margin-right: 10px;
    }
  }
`;
