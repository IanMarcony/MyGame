import { Avatar } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import BannerIcon from '../../assets/banner.jpg';
import UserIcon from '../../assets/user.png';
import Posts from '../../components/Post';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  AccountsGamesArea,
  AccountsPreferencesArea,
  ActionsProfileArea,
  BannerUserIcon,
  Container,
  ContentProfile,
  DescriptionProfile,
  FriendsListArea,
  HeaderInfoProfile,
  PostsArea,
  PreferencesArea,
  ProfileImagesArea,
  UserAvatarIcon,
  UserExtrasProfile,
  UserInfoProfile,
} from './styles';

interface IPreferences {
  id: number;
  value: string;
}

interface IAccountsGames {
  id: number;
  username: string;
  company: string;
  url_icon: string;
}

interface IFriends {
  id: number;
  url_profile_photo: string;
  name: string;
  email: string;
}

interface IUser {
  url_profile_photo: string;
  name: string;
  email: string;
}
interface IComments {
  id: number;
  text: string;
  user: IUser;
}

interface IFilePost {
  id: number;
  filename: string;
  type: 'image' | 'video';
}

interface IPosts {
  id: number;
  id_user: number;
  description: string;
  filesPost: IFilePost[];
  is_private: boolean;
  is_liked: boolean;
  count_likes: number;
  count_comments: number;
  coments: IComments[];
  user: IUser;
}

const Profile: React.FC = () => {
  const { email } = useParams();
  const { user, token } = useAuth();
  const [bannerIcon, setBannerIcon] = useState(BannerIcon);
  const [userIcon, setUserIcon] = useState(UserIcon);
  const [descriptionUser, setDescriptionUser] = useState('');
  const [nameUser, setNameUser] = useState('');

  const [isSelfUser, setIsSelfUser] = useState(true);

  const [preferencesUser, setPreferencesUser] = useState<IPreferences[]>([]);
  const [accountsGamesUser, setAccountsGamesUser] = useState<IAccountsGames[]>(
    [],
  );
  const [userId, setUserId] = useState(0);

  const [friends, setFriends] = useState<IFriends[]>([]);
  const [showButtonFriends, setShowButtonsFriends] = useState(true);

  const [postsUser, setPostsUser] = useState<IPosts[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleLoadPosts = useCallback(
    async (id_user: number) => {
      if (loading) {
        return;
      }
      if (total > 0 && postsUser.length === total) {
        return;
      }
      setLoading(true);

      const { data } = await api.get(`/posts/${page}`, {
        params: { page, id_user },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { count, posts: newPosts } = data;

      setPostsUser([...postsUser, ...newPosts]);

      setTotal(count);
      setPage(page + 1);
      setLoading(false);
    },
    [loading, total, postsUser, page, token],
  );

  const handleGetUserProfile = useCallback(async () => {
    const { data: userData } = await api.get(`/users/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (userData.url_banner_photo) {
      setBannerIcon(
        `${process.env.REACT_APP_API_URL}/files/${userData.url_banner_photo}`,
      );
    }

    if (userData.url_profile_photo) {
      setUserIcon(
        `${process.env.REACT_APP_API_URL}/files/${userData.url_profile_photo}`,
      );
    }

    setNameUser(userData.name);

    if (userData.description) {
      setDescriptionUser(userData.description);
    }

    setIsSelfUser(userData.email === user.email);

    setPreferencesUser(
      userData.preferences.map((item: { account_game: IPreferences }) => {
        return item.account_game as IPreferences;
      }),
    );

    setAccountsGamesUser(
      userData.account_games_users.map(
        (item: {
          username: string;
          id: number;
          account_game: { url_icon: string; company: string };
        }) => {
          return {
            username: item.username,
            id: item.id,
            url_icon: item.account_game.url_icon,
            company: item.account_game.company,
          };
        },
      ),
    );

    const { data } = await api.get(`/posts/1`, {
      params: { page: 1, id_user: userData.id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { count, posts: newPosts } = data;

    setPostsUser([...newPosts]);

    setTotal(count);
    setPage(page + 1);
    setLoading(false);
  }, [email, page, token, user.email]);

  useEffect(() => {
    setPostsUser([]);
    setTotal(0);
    setPage(1);
    setBannerIcon(BannerIcon);
    setUserIcon(UserIcon);
    handleGetUserProfile();
  }, [email]);

  return (
    <Container>
      <ProfileImagesArea>
        <BannerUserIcon src={bannerIcon} alt="Banner" />
        <UserAvatarIcon src={userIcon} alt="User" />
      </ProfileImagesArea>
      <ContentProfile>
        <HeaderInfoProfile>
          <UserInfoProfile>
            <h1>{nameUser}</h1>
            <DescriptionProfile>{descriptionUser}</DescriptionProfile>
          </UserInfoProfile>

          <UserExtrasProfile>
            {!isSelfUser && (
              <ActionsProfileArea>
                <button type="button">Envia mensagem</button>

                {showButtonFriends && (
                  <button type="button">Adicionar amigo</button>
                )}
              </ActionsProfileArea>
            )}
            <FriendsListArea>
              <h3>Amigos</h3>

              {friends.length === 0 ? (
                <span>Sem amigos</span>
              ) : (
                <ul>
                  {friends.map((item) => (
                    <li key={item.id}>
                      <Link to={`/dashboard/profile/${item.email}`}>
                        <Avatar
                          alt="Foto de perfil"
                          src={
                            item.url_profile_photo
                              ? `${process.env.REACT_APP_API_URL}/files/${item.url_profile_photo}`
                              : UserIcon
                          }
                          sx={{ width: 35, height: 35 }}
                        />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </FriendsListArea>
          </UserExtrasProfile>
        </HeaderInfoProfile>
      </ContentProfile>

      <AccountsPreferencesArea>
        <PreferencesArea>
          <h3>Preferências</h3>
          <ul>
            {preferencesUser.map((item) => (
              <li key={item.id}>{item.value}</li>
            ))}
          </ul>
        </PreferencesArea>

        <AccountsGamesArea>
          <h3>Contas de Jogos</h3>
          {accountsGamesUser.length === 0 ? (
            <span>Sem contas registradas</span>
          ) : (
            <ul>
              {accountsGamesUser.map((item) => (
                <li key={item.id}>
                  <img src={item.url_icon} alt={item.company} />
                  {item.username}
                </li>
              ))}
            </ul>
          )}
        </AccountsGamesArea>
      </AccountsPreferencesArea>

      <PostsArea>
        {postsUser.length > 0 &&
          postsUser.map((item) => {
            return <Posts key={item.id} value={item} />;
          })}
      </PostsArea>
    </Container>
  );
};

export default Profile;
