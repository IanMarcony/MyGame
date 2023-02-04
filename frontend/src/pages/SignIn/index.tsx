import React, { useCallback, useState } from 'react';
import { Link, redirect } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Container, FormSignin, SectionSignin } from './styles';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleSignIn = useCallback(async () => {
    try {
      await signIn({ email, password });
      return redirect('/dashboard');
    } catch (e) {
      return alert('Erro ao processar dados');
    }
  }, [signIn, email, password]);

  return (
    <Container>
      <SectionSignin>
        <h1>Acesse sua conta</h1>
        <FormSignin onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            defaultValue={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            defaultValue={password}
            onChange={({ target }) => setPassword(target.value)}
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
