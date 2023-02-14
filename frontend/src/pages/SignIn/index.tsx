import React, { useCallback } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
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
    async (data: ILoginState) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required().min(8),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ email: data.email, password: data.password });
        return nagivate('/dashboard');
      } catch (e) {
        return alert('Erro ao processar dados');
      }
    },
    [signIn, nagivate],
  );

  return (
    <Container>
      {user && <Navigate to="/dashboard" replace />}
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
