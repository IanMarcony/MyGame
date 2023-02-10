import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SectionChange = styled.section`
  width: 70%;
  background-color: var(--background-secondary-color);
  margin-top: 5%;
  padding: 20px 5px 25px 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  -webkit-box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.75);
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  h1 {
    color: var(--text-secondary-color);
    font-weight: 700;
    font-size: 40px;
    margin: 0 auto;
  }

  a {
    position: relative;
    left: -10%;
    display: flexbox;
    height: 45px;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 5px;
    border-width: 0;
    text-align: center;
    text-decoration: none;
    background-color: var(--button-color);
    color: var(--text-secondary-color);
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const FormChange = styled(Form)`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  span {
    margin-bottom: 10px;
    align-self: flex-start;
  }

  input + input {
    margin-top: 10px;
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
