/* eslint-disable consistent-return */
import { FormHandles } from '@unform/core';
import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../../components/Input';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, FormForgot, Header, SectionForgot } from './styles';

interface IDataSubmit {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: IDataSubmit) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/password/forgot', data);

        addToast({
          title: 'Sucesso!',
          description: 'Sucesso ao enviar pedido de troca de senha',
          type: 'success',
        });

        return navigate('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          title: 'Error',
          description: 'Erro ao enviar email de troca de senha',
          type: 'error',
        });
      }
    },
    [navigate, addToast],
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
        <FormForgot ref={formRef} onSubmit={handleSubmit}>
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
