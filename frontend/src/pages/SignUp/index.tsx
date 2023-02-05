/* eslint-disable react/no-array-index-key */
import React, { useCallback, useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import {
  AccountsContainer,
  Container,
  FormSignup,
  HeaderSignup,
  SectionSignup,
} from './styles';
import DateInput from '../../components/DateInput';
import api from '../../services/api';
import AccountInput from '../../components/AccountInput';

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

  const handleSubmit = useCallback(async (data: any) => {
    console.log(data);
  }, []);

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

          <DateInput name="bith_date" />

          <h2 className="preferences">Agora fale um pouco mais sobre você</h2>

          {accountGames && (
            <>
              <h3>
                Insira o username das contas de jogos para compartilhar com
                amigos
              </h3>
              <AccountsContainer>
                {accountGames.map((item) => {
                  return (
                    <AccountInput
                      key={item.id}
                      name={item.company.toLowerCase()}
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
