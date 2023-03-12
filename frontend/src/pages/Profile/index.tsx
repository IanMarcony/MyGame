import {
  Avatar,
  Box,
  Chip,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Waypoint } from 'react-waypoint';

import { Link, useParams } from 'react-router-dom';

import Modal from 'react-modal';
import { FiBookOpen, FiUser } from 'react-icons/fi';
import { BsUpload } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import BannerIcon from '../../assets/banner.jpg';
import UserIcon from '../../assets/user.png';
import Posts from '../../components/Post';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  AccountsContainer,
  AccountsGamesArea,
  AccountsPreferencesArea,
  ActionsProfileArea,
  BannerUserIcon,
  Container,
  ContentProfile,
  DescriptionProfile,
  DropImageProfileArea,
  FormBasicInfo,
  FriendsListArea,
  HeaderInfoProfile,
  ImageBannerArea,
  ImageProfileArea,
  InputImagesArea,
  ModalContainer,
  ModalHeader,
  PostsArea,
  PreferencesArea,
  ProfileImagesArea,
  UserAvatarIcon,
  UserExtrasProfile,
  UserInfoProfile,
} from './styles';

import Input from '../../components/Input';
import DateInput from '../../components/DateInput';
import AccountInput from '../../components/AccountInput';

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
  const fileImageProfileInput = useRef<HTMLInputElement>(null);
  const fileImageBannerInput = useRef<HTMLInputElement>(null);
  const [imageProfile, setImageProfile] = useState<File | null>(null);
  const [imageBanner, setImageBanner] = useState<File | null>(null);
  const [previewUrlImageProfile, setPreviewUrlImageProfile] = useState(() => {
    return UserIcon;
  });
  const [previewUrlImageBanner, setPreviewUrlImageBanner] = useState(() => {
    return BannerIcon;
  });

  const [friends, setFriends] = useState<IFriends[]>([]);
  const [typeButtonShow, setTypeButtonShow] = useState(1);
  const [requestIdFriend, setRequestIdFriend] = useState(0);

  const [postsUser, setPostsUser] = useState<IPosts[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [isOpenBasicInfoModal, setIsOpenBasicInfoModal] = useState(false);

  const toggleOpenBasicInfoModal = useCallback(() => {
    setIsOpenBasicInfoModal(!isOpenBasicInfoModal);
  }, [isOpenBasicInfoModal]);

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
      setPreviewUrlImageBanner(
        `${process.env.REACT_APP_API_URL}/files/${userData.url_banner_photo}`,
      );
    }

    if (userData.url_profile_photo) {
      setUserIcon(
        `${process.env.REACT_APP_API_URL}/files/${userData.url_profile_photo}`,
      );
      setPreviewUrlImageProfile(
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

  const handleBasicInfoSubmit = useCallback(
    async (data: any) => {
      toggleOpenBasicInfoModal();
    },
    [toggleOpenBasicInfoModal],
  );

  const handleFileProfile = useCallback((file: File | null) => {
    setImageProfile(file);
    if (file) {
      setPreviewUrlImageProfile(URL.createObjectURL(file));
    }
  }, []);

  const handleFileBanner = useCallback((file: File | null) => {
    setImageBanner(file);
    if (file) {
      setPreviewUrlImageBanner(URL.createObjectURL(file));
    }
  }, []);
  const handleOnDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    [],
  );
  const handleOnDropImageProfile = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const imageFile = event.dataTransfer.files[0];

      handleFileProfile(imageFile);
    },
    [handleFileProfile],
  );

  const handleOnDropImageBanner = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const imageFile = event.dataTransfer.files[0];

      handleFileBanner(imageFile);
    },
    [handleFileBanner],
  );

  const handleFileImageProfileClick = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    fileImageProfileInput.current && fileImageProfileInput.current.click();
  }, [fileImageProfileInput]);

  const handleFileImageBannerClick = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    fileImageBannerInput.current && fileImageBannerInput.current.click();
  }, [fileImageBannerInput]);

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
            <ActionsProfileArea>
              {!isSelfUser && (
                <>
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
                </>
              )}

              {isSelfUser && (
                <button
                  type="button"
                  onClick={() => toggleOpenBasicInfoModal()}
                >
                  Alterar perfil
                </button>
              )}
            </ActionsProfileArea>

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

      <Modal
        isOpen={isOpenBasicInfoModal}
        onRequestClose={toggleOpenBasicInfoModal}
        style={{
          content: {
            height: 'max-content',
            padding: 0,
            borderRadius: '10px',
            border: '2px solid var(--text-color)',
          },
          overlay: {
            backgroundColor: '#342e2ed3',
          },
        }}
      >
        <ModalContainer>
          <ModalHeader>
            <h2>Atualize suas informações</h2>
            <button type="button" onClick={() => toggleOpenBasicInfoModal()}>
              <AiFillCloseCircle />
            </button>
          </ModalHeader>
          <FormBasicInfo onSubmit={handleBasicInfoSubmit}>
            <InputImagesArea>
              <DropImageProfileArea
                onDragOver={handleOnDragOver}
                onDrop={handleOnDropImageProfile}
                onClick={handleFileImageProfileClick}
              >
                {previewUrlImageProfile && (
                  <ImageProfileArea>
                    <Avatar
                      alt="Foto de perfil"
                      src={previewUrlImageProfile}
                      sx={{ width: 100, height: 100 }}
                    />
                  </ImageProfileArea>
                )}
                <p>
                  Arraste e solte sua foto de perfil <BsUpload />{' '}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileImageProfileInput}
                  hidden
                  onChange={(e) =>
                    handleFileProfile(e.target.files && e.target.files[0])
                  }
                />
              </DropImageProfileArea>

              <DropImageProfileArea
                onDragOver={handleOnDragOver}
                onDrop={handleOnDropImageBanner}
                onClick={handleFileImageBannerClick}
              >
                {previewUrlImageBanner && (
                  <ImageBannerArea>
                    <img alt="Foto de capa" src={previewUrlImageBanner} />
                  </ImageBannerArea>
                )}
                <p>
                  Arraste e solte sua foto de capa <BsUpload />{' '}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileImageBannerInput}
                  hidden
                  onChange={(e) =>
                    handleFileBanner(e.target.files && e.target.files[0])
                  }
                />
              </DropImageProfileArea>
            </InputImagesArea>

            <Input
              name="name"
              icon={FiUser}
              type="text"
              placeholder="Nome"
              defaultValue={nameUser}
            />

            <Input
              name="description"
              icon={FiBookOpen}
              type="text"
              placeholder="Descrição"
              defaultValue={descriptionUser}
            />

            <DateInput name="birth_date" />

            {/* <h2 className="preferences">Agora fale um pouco mais sobre você</h2>

          {accountGames && (
            <>
              <h3>
                Insira o username das contas de jogos para compartilhar com
                amigos, se não tiver não se preocupe, não é obrigatório
              </h3>
              <AccountsContainer>
                {accountGames.map((item) => {
                  return (
                    <AccountInput
                      key={item.id}
                      name={`account_${item.company.toLowerCase()}_${item.id}`}
                      valueAccount={item}
                      placeholder="Username"
                    />
                  );
                })}
              </AccountsContainer>
            </>
          )}

          {categoriesGame && (
            <>
              {' '}
              <h3>Selecione pelo menos uma preferência</h3>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                placeholder="Selecione suas preferências"
                defaultValue={[]}
                value={categoriesGameSelected}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value, index) => (
                      <Chip key={index} label={value} />
                    ))}
                  </Box>
                )}
              >
                {categoriesGame.map((category) => (
                  <MenuItem
                    key={category.id}
                    value={`${category.id}-${category.value}`}
                    style={getStyles(
                      `${category.id}-${category.value}`,
                      categoriesGameSelected,
                    )}
                  >
                    {category.value}
                  </MenuItem>
                ))}
              </Select>
            </>
          )} */}

            <button type="submit">Atualizar dados</button>
          </FormBasicInfo>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default Profile;
