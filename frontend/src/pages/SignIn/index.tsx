import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Form, SectionSignin } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <SectionSignin>
        <h1>Acesse sua conta</h1>
        <Form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Senha" />
          <button type="submit">Entrar</button>
          <Link to="/signup">Criar conta</Link>
        </Form>
      </SectionSignin>
    </Container>
  );
};

export default SignIn;
