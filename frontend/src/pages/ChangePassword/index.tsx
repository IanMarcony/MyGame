/* eslint-disable consistent-return */
import React, { useCallback, useMemo } from 'react';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../../components/Input';
import api from '../../services/api';

import { Container, FormChange, Header, SectionChange } from './styles';

interface IDataSubmit {
  password: string;
  repassword: string;
}

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const searchParams = useMemo(
    () => new URLSearchParams(document.location.search),
    [],
  );

  const handleSubmit = useCallback(
    async (data: IDataSubmit) => {
      try {
        const schema = Yup.object().shape({
          password: Yup.string().required().min(8).max(16),
          repassword: Yup.string().required().min(8).max(16),
        });

        await schema.validate(data, { abortEarly: false });
        if (data.password !== data.repassword) {
          throw new Error('As senhas não são iguais');
        }

        const body = {
          password: data.password,
          token: searchParams.get('token'),
        };

        await api.post('/password/reset', body);

        return navigate('/');
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    },
    [navigate, searchParams],
  );

  return (
    <Container>
      <SectionChange>
        <Header>
          <h1>Troque sua senha</h1>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </Header>
        <FormChange onSubmit={handleSubmit}>
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Insira sua nova senha"
          />

          <Input
            name="repassword"
            icon={FiLock}
            type="password"
            placeholder="Confirme sua senha"
          />

          <button type="submit">Enviar</button>
        </FormChange>
      </SectionChange>
    </Container>
  );
};

export default ChangePassword;
