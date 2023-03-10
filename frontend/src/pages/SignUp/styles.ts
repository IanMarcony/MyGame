import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const AccountsContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1.5rem;
  align-items: center;
`;

export const SectionSignup = styled.section`
  width: 70%;
  height: fit-content;
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

export const HeaderSignup = styled.div`
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

export const FormSignup = styled(Form)`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

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

  > h2 {
    margin-bottom: 14px;
  }

  .preferences {
    margin-top: 20px;
  }

  h3 {
    margin-bottom: 15px;
    margin-top: 15px;
  }

  .MuiInputBase-root {
    width: 100%;
    fieldset {
      border: 0;
    }
    .MuiSvgIcon-root {
      color: var(--text-color);
    }

    .MuiChip-label {
      color: var(--text-secondary-color);
    }
  }
`;

export const InputImagesArea = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const DropImageProfileArea = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 40%;
  color: var(--text-color);
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

export const ImageProfileArea = styled.div``;
export const ImageBannerArea = styled.div`
  width: 200px;
  height: 90px;
  img {
    width: 100%;
    height: 100%;
  }
`;
