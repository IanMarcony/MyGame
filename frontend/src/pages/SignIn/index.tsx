import React, { useCallback, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/auth';

import { Container, FormSignin, SectionSignin } from './styles';

interface ILoginState {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn, user } = useAuth();
  const nagivate = useNavigate();
  const handleSignIn = useCallback(
    async ({ email, password }: ILoginState) => {
      try {
        await signIn({ email, password });
        return nagivate('/dashboard');
      } catch (e) {
        return alert('Erro ao processar dados');
      }
    },
    [signIn, nagivate],
  );

  return (
    <Container>
      {user && <Navigate to="dashboard" replace />}
      <SectionSignin>
        <h1>Acesse sua conta</h1>
        <FormSignin onSubmit={handleSignIn}>
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
