import { Avatar } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { Waypoint } from 'react-waypoint';

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
  const [typeButtonShow, setTypeButtonShow] = useState(1);
  const [requestIdFriend, setRequestIdFriend] = useState(0);

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
      setLoading(false);
    },
    [loading, total, postsUser, page, token],
  );

  const handleInfiniteScroll = useCallback(() => {
    if (loading) {
      return;
    }
    if (total > 0 && postsUser.length === total) {
      return;
    }

    setPage(page + 1);
  }, [loading, page, postsUser.length, total]);

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

    setUserId(userData.id);

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

    const { is_friend, is_requested, id_request } = userData;

    if (is_friend) {
      setTypeButtonShow(3);
    } else if (is_requested) {
      setTypeButtonShow(2);
      setRequestIdFriend(id_request);
    } else {
      setTypeButtonShow(1);
    }

    const { data } = await api.get(`/posts/1`, {
      params: { page: 1, id_user: userData.id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { count, posts: newPosts } = data;

    setPostsUser([...newPosts]);

    setTotal(count);
    setLoading(false);
  }, [email, token, user.email]);

  const handleAddFriend = useCallback(async () => {
    const { data } = await api.post(
      '/friends/request',
      { email_friend: email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setRequestIdFriend(data.id_request);
    setTypeButtonShow(2);
  }, [email, token]);
  const handleCancelFriendRequest = useCallback(async () => {
    await api.delete(`/friends/request`, {
      params: { id_request: requestIdFriend },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTypeButtonShow(1);
  }, [requestIdFriend, token]);
  const handleDeleteFriend = useCallback(async () => {
    await api.delete(`/friends/remove`, {
      params: { id_friend: userId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTypeButtonShow(1);
  }, [token, userId]);

  useEffect(() => {
    setPostsUser([]);
    setTotal(0);
    setPage(1);
    setBannerIcon(BannerIcon);
    setUserIcon(UserIcon);
    handleGetUserProfile();
  }, [email]);

  useEffect(() => {
    handleLoadPosts(userId);
  }, [page]);

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

                {typeButtonShow === 1 && (
                  <button type="button" onClick={() => handleAddFriend()}>
                    Adicionar amigo
                  </button>
                )}
                {typeButtonShow === 2 && (
                  <button
                    type="button"
                    onClick={() => handleCancelFriendRequest()}
                  >
                    Cancelar solicitação
                  </button>
                )}
                {typeButtonShow === 3 && (
                  <button type="button" onClick={() => handleDeleteFriend()}>
                    Excluir amigo
                  </button>
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
        {postsUser.map((item, i) => {
          return (
            <>
              <Posts key={item.id} value={item} />
              {i === postsUser.length - postsUser.length * 0.5 && (
                <Waypoint onEnter={() => handleInfiniteScroll()} />
              )}
            </>
          );
        })}
      </PostsArea>
    </Container>
  );
};

export default Profile;
