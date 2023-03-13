import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;

  flex-direction: column;
  align-items: center;
`;

export const ProfileImagesArea = styled.div`
  width: 60%;
  position: relative;
`;

export const BannerUserIcon = styled.img`
  border-radius: 10px 10px 0 0;
  object-fit: cover;
  width: 100%;
  height: 450px;
`;

export const UserAvatarIcon = styled.div`
  position: absolute;
  top: 60%;
  border-radius: 50%;
  left: 2%;
  width: 200px;
  height: 200px;

  border: 3px solid var(--text-secondary-color);
  img {
    border-radius: 50%;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export const ContentProfile = styled.div`
  padding: 30px 10px 10px 5px;
  border-radius: 0 0 10px 10px;
  width: 60%;
  margin-top: -5px;

  display: flex;
  flex-direction: column;
  background-color: var(--background-secondary-color);
`;

export const DescriptionProfile = styled.p`
  margin-top: 10px;
  text-align: justify;
  word-wrap: break-word;
  max-height: 100px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 2px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;
export const UserInfoProfile = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  h1 {
    max-width: 100%;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  * {
    margin-left: 10px;
  }
`;
export const HeaderInfoProfile = styled.div`
  width: 100%;
  display: flex;
`;

export const HeaderPreferencesProfile = styled.header`
  width: 100%;
  display: flex;

  button {
    margin-left: auto;
    border-radius: 10px;
    padding: 5px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const UserExtrasProfile = styled.div`
  width: 50%;
  padding: 5px;
  display: flex;
  flex-direction: column;
`;

export const ActionsProfileArea = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;

  button {
    border-radius: 10px;
    padding: 5px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  button + button {
    margin-left: 5px;
  }
`;

export const PreferencesArea = styled.div`
  margin-top: 10px;
  width: 50%;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
  background-color: var(--background-color);

  ul {
    margin-top: 5px;
    list-style-type: none;
    width: 100%;
    padding: 2px;

    max-height: 90px;
    overflow-x: none;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 2px;
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
      background-color: var(--background-secondary-color);
      text-align: center;
      border-radius: 5px;
      padding: 5px;
    }
  }
`;

export const AccountsPreferencesArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  width: 60%;
  border-radius: 10px;
  justify-content: space-between;
  padding: 10px;
  background-color: var(--background-secondary-color);
  > div {
    display: flex;
    flex: 1;
  }
`;

export const FriendsListArea = styled.div`
  margin-top: 10px;
  flex: 1;
  border-radius: 10px;
  padding: 10px;
  background-color: var(--background-color);

  ul {
    margin-top: 5px;
    list-style-type: none;
    width: 100%;
    padding: 2px;

    max-height: 90px;
    overflow-x: none;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 2px;
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
      background-color: var(--background-secondary-color);
      border-radius: 5px;
      padding: 5px;

      a {
        text-align: center;
        color: var(--text-color);
        align-items: center;
        text-decoration: none;
        display: flex;
      }

      span {
        margin-left: 5px;
        max-width: 100%;
        overflow-x: hidden;
        text-overflow: ellipsis;
      }

      transition: opacity 0.2s;

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;

export const AccountsGamesArea = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  width: 50%;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;
  background-color: var(--background-color);

  ul {
    margin-top: 5px;
    list-style-type: none;
    width: 100%;
    padding: 2px;

    max-height: 90px;
    overflow-x: none;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 2px;
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
      display: flex;
      background-color: var(--background-secondary-color);
      border-radius: 5px;
      padding: 5px;
      align-items: center;

      img {
        object-fit: cover;
        margin-right: 5px;

        border-radius: 50%;
        width: 10%;
        height: 20%;
      }
    }
  }
`;

export const PostsArea = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin-top: 30px;
  overflow-y: none;
  overflow-x: none;
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
`;

export const ModalHeader = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  h2 {
    margin: 0 auto;
    text-align: center;
  }

  button {
    border-radius: 50%;
    padding: 5px;
    width: 25px;
    height: 25px;
  }
`;

export const FormBasicInfo = styled(Form)`
  width: 100%;
  height: max-content;
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

export const AccountsContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1.5rem;
  align-items: center;
`;
