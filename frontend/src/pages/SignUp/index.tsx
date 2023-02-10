/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  FiArrowLeft,
  FiBookOpen,
  FiLock,
  FiMail,
  FiUser,
} from 'react-icons/fi';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { sub } from 'date-fns';
import { BsUpload } from 'react-icons/bs';
import { Avatar } from '@mui/material';
import Input from '../../components/Input';
import {
  AccountsContainer,
  Container,
  DropImageProfileArea,
  FormSignup,
  HeaderSignup,
  ImageBannerArea,
  ImageProfileArea,
  InputImagesArea,
  SectionSignup,
} from './styles';

import UserIcon from '../../assets/user.png';
import BannerIcon from '../../assets/banner.jpg';

import DateInput from '../../components/DateInput';
import api from '../../services/api';
import AccountInput from '../../components/AccountInput';
import { useAuth } from '../../hooks/auth';
import Constants from '../../utils/Constants';

interface ICategoriesGame {
  id: number;
  value: string;
}

interface IAccountGame {
  id: number;
  url_icon: string;
  company: string;
}

const SignUp: React.FC = () => {
  const [categoriesGame, setCategoriesGame] = useState<ICategoriesGame[]>([]);
  const [accountGames, setAccountGames] = useState<IAccountGame[]>([]);
  const [categoriesGameSelected, setCategoriesGameSelected] = useState<
    string[]
  >([]);
  const fileImageProfileInput = useRef<HTMLInputElement>(null);
  const fileImageBannerInput = useRef<HTMLInputElement>(null);
  const [imageProfile, setImageProfile] = useState<File | null>(() => {
    return new File([UserIcon], 'user.png', {
      type: 'image/*',
    });
  });
  const [imageBanner, setImageBanner] = useState<File | null>(() => {
    return new File([BannerIcon], 'banner.jpg', {
      type: 'image/*',
    });
  });
  const [previewUrlImageProfile, setPreviewUrlImageProfile] = useState(() => {
    return UserIcon;
  });
  const [previewUrlImageBanner, setPreviewUrlImageBanner] = useState(() => {
    return BannerIcon;
  });
  const { signIn } = useAuth();
  const nagivate = useNavigate();

  const handleRequestBase = useCallback(async () => {
    const [categoriesResponse, accountsResponse] = await Promise.all([
      await api.get('/categoriesgame'),
      await api.get('/accountgames'),
    ]);
    setCategoriesGame(categoriesResponse.data);
    setAccountGames(accountsResponse.data);
  }, []);

  const getStyles = useCallback((name: string, arr: readonly string[]) => {
    return {
      fontWeight: arr.indexOf(name) === -1 ? 400 : 500,
      backgroundColor: arr.indexOf(name) === -1 ? '#353B50' : '#454D6B',
      color: arr.indexOf(name) === -1 ? '#D6D7DC' : '#FFF8EC',
    };
  }, []);

  const handleChange = useCallback(
    (event: SelectChangeEvent<typeof categoriesGameSelected>) => {
      const {
        target: { value: selectedValue },
      } = event;

      setCategoriesGameSelected(
        typeof selectedValue === 'string'
          ? selectedValue.split(',')
          : selectedValue,
      );
    },
    [],
  );

  const handleImagesSubmit = useCallback(async () => {
    if (imageProfile === null || imageBanner === null) {
      throw new Error('Envio obrigatório de foto e capa');
    }
    const token = localStorage.getItem(Constants.storage.token);
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'multipart/form-data',
      },
    };

    const formData = new FormData();
    formData.append('profile_image', imageProfile);
    formData.append('banner_image', imageBanner);

    await api.patch('/users/images', formData, config);

    return nagivate('/dashboard');
  }, [imageBanner, imageProfile, nagivate]);

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          // birth_date: Yup.string().required('Data de nascimento obrigatória'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required().min(8).max(16),
          repassword: Yup.string().required().min(8).max(16),
        });

        await schema.validate(data, { abortEarly: false });
        if (imageProfile === null || imageBanner === null) {
          throw new Error('Envio obrigatório de foto e capa');
        }
        if (data.password !== data.repassword) {
          throw new Error('As senhas não são iguais');
        }

        if (categoriesGameSelected.length === 0) {
          throw new Error('Deve selecionar pelo menos uma preferência');
        }

        const dateTenYears = sub(new Date(), {
          years: 10,
        });
        const birthDate_aux = new Date(data.birth_date);

        if (birthDate_aux.getFullYear() > dateTenYears.getFullYear()) {
          throw new Error('Deve ser uma data de pelo menos 10 anos atrás');
        }

        Object.assign(data, {
          birth_date: data.birth_date.replaceAll('/', '-'),
        });

        const preferencesUser = categoriesGameSelected.map((item) => {
          return {
            id_category_game: parseInt(item.split('-')[0]),
          };
        });

        Object.assign(data, {
          preferences: preferencesUser,
        });

        const keysFromDataSubmit = Object.keys(data);
        const keysAccountsGame = keysFromDataSubmit.filter(
          (item) => item.includes('account_') && data[item] !== '',
        );

        const accountsGameUser = keysAccountsGame.map((item) => {
          return {
            username: data[item],
            id_account_game: parseInt(item.split('_')[2]),
          };
        });

        Object.assign(data, {
          accounts_game: accountsGameUser,
        });

        await api.post('/users', data);
        await signIn({ email: data.email, password: data.password });
        handleImagesSubmit();
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    },
    [
      imageProfile,
      imageBanner,
      categoriesGameSelected,
      signIn,
      handleImagesSubmit,
    ],
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
    handleRequestBase();
  }, [handleRequestBase]);

  return (
    <Container>
      <SectionSignup>
        <HeaderSignup>
          <h1>Crie sua conta!</h1>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </HeaderSignup>
        <FormSignup onSubmit={handleSubmit}>
          <h2>Insira suas informações abaixo</h2>
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

          <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
          <Input name="email" icon={FiMail} type="email" placeholder="Email" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Input
            name="repassword"
            icon={FiLock}
            type="password"
            placeholder="Confirme sua senha"
          />

          <Input
            name="description"
            icon={FiBookOpen}
            type="text"
            placeholder="Descrição"
          />

          <DateInput name="birth_date" />

          <h2 className="preferences">Agora fale um pouco mais sobre você</h2>

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
          )}

          <button type="submit">Criar conta</button>
        </FormSignup>
      </SectionSignup>
    </Container>
  );
};

export default SignUp;
