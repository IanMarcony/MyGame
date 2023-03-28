/* eslint-disable consistent-return */
import React, { useCallback, useRef } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/auth';

import { Container, FormSignin, SectionSignin } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { useProgressLoading } from '../../hooks/progress';

interface ILoginState {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn, user } = useAuth();
  const { addToast } = useToast();
  const nagivate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const { toggleLoading } = useProgressLoading();

  const handleSignIn = useCallback(
    async (data: ILoginState) => {
      try {
        formRef.current?.setErrors({});
        toggleLoading();

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required('Digite sua senha')
            .min(8, 'Digite sua senha entre 8 e 16 digitos')
            .max(16, 'Digite sua senha entre 8 e 16 digitos'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ email: data.email, password: data.password });
        toggleLoading();
        return nagivate('/dashboard');
      } catch (err) {
        toggleLoading();

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          title: 'Error',
          description: 'Algo ocorreu ao entrar na sua conta',
          type: 'error',
        });
      }
    },
    [toggleLoading, signIn, nagivate, addToast],
  );

  return (
    <Container>
      {user && <Navigate to="/dashboard" replace />}
      <SectionSignin>
        <h1>Acesse sua conta</h1>
        <FormSignin ref={formRef} onSubmit={handleSignIn}>
          <Input name="email" icon={FiMail} type="email" placeholder="Email" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Link id="forgot" to="/password/forgot">
            Esqueci minha senha
          </Link>

          <button type="submit">Entrar</button>
          <Link to="/signup">Não tem uma conta? Crie agora</Link>
        </FormSignin>
      </SectionSignin>
    </Container>
  );
};

export default SignIn;
