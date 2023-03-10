import styled from 'styled-components';

import { Form } from '@unform/web';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SectionSignin = styled.section`
  width: 40%;
  height: 500px;
  background-color: var(--background-secondary-color);
  margin-top: 5%;
  padding: 20px 5px 10px 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: var(--text-secondary-color);
    font-weight: 700;
    font-size: 40px;
  }

  -webkit-box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 2px 8px 0px rgba(0, 0, 0, 0.75);
`;

export const FormSignin = styled(Form)`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

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

  #forgot {
    padding: 0;
    display: flex;
    justify-content: start;
    background-color: #0000;
    font-size: 14px;
    text-decoration: underline;

    &:hover {
      opacity: 0.6;
    }
  }

  a {
    width: 100%;
    display: block;
    padding: 12px;
    margin-top: 12px;
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
