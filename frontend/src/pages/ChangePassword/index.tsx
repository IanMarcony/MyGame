/* eslint-disable consistent-return */
import React, { useCallback, useMemo, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Input from '../../components/Input';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, FormChange, Header, SectionChange } from './styles';
import FormError from '../../exceptions/FormError';
import { useToast } from '../../hooks/toast';

interface IDataSubmit {
  password: string;
  repassword: string;
}

const ChangePassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const searchParams = useMemo(
    () => new URLSearchParams(document.location.search),
    [],
  );

  const handleSubmit = useCallback(
    async (data: IDataSubmit) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required().min(8).max(16),
          repassword: Yup.string().required().min(8).max(16),
        });

        await schema.validate(data, { abortEarly: false });
        if (data.password !== data.repassword) {
          throw new FormError({
            repassword: 'As senhas não são iguais',
            password: 'As senhas não são iguais',
          });
        }

        const body = {
          password: data.password,
          token: searchParams.get('token'),
        };

        await api.post('/password/reset', body);

        return navigate('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        if (err instanceof FormError) {
          formRef.current?.setErrors(err.errors);
          return;
        }
        addToast({
          title: 'Error',
          description: 'Erro ao trocar senha',
          type: 'error',
        });
      }
    },
    [navigate, searchParams, addToast],
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
        <FormChange ref={formRef} onSubmit={handleSubmit}>
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
