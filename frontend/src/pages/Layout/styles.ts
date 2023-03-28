import styled from 'styled-components';

export const NavHeader = styled.nav`
  display: flex;
  background-color: var(--background-secondary-color);
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 10px;
`;

export const ContentButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 5px;

  svg {
    color: var(--background-high-color);
  }

  a + a {
    margin-left: 5px;
  }

  a {
    display: block;
    border-radius: 10px;
    padding: 8px;
    background-color: var(--background-color);
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.5;
    }
  }
`;

export const UserButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    color: var(--background-high-color);
  }

  a + a {
    margin-left: 25px;
  }

  a {
    display: block;

    transition: opacity 0.2s;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }

  a:nth-child(2) {
    border-radius: 10px;
    padding: 5px;
    background-color: var(--background-color);
  }

  a:nth-child(3) {
    border-radius: 10px;
    padding: 5px;
    background-color: var(--background-color);
  }
`;
