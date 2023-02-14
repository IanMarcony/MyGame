/* eslint-disable consistent-return */
import React, { useCallback } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../../components/Input';
import api from '../../services/api';

import { Container, FormForgot, Header, SectionForgot } from './styles';

interface IDataSubmit {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: IDataSubmit) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/password/forgot', data);

        return navigate('/');
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    },
    [navigate],
  );

  return (
    <Container>
      <SectionForgot>
        <Header>
          <h1>Troque sua senha</h1>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </Header>
        <FormForgot onSubmit={handleSubmit}>
          <span>
            Se tiver uma conta associada com esse email será um link para trocar
            a senha
          </span>
          <Input name="email" icon={FiMail} type="email" placeholder="Email" />

          <button type="submit">Enviar</button>
        </FormForgot>
      </SectionForgot>
    </Container>
  );
};

export default ForgotPassword;
