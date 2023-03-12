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
  height: 100%;
`;

export const UserAvatarIcon = styled.img`
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: 65%;
  left: 2%;
  width: 22%;
  height: 40%;

  border: 3px solid var(--text-secondary-color);
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
  width: 48%;
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
  margin-top: 10px;
  width: 60%;
  border-radius: 10px;
  justify-content: space-between;
  padding: 10px;
  background-color: var(--background-secondary-color);
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
  width: 48%;
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
