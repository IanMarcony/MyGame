import React from 'react';
import EmojiSurprised from '../../assets/surprised.png';

import { Container } from './styles';

const PageNotFound: React.FC = () => {
  return (
    <Container>
      <span>Página não encontrada</span>
      <h1>404</h1>

      <img src={EmojiSurprised} alt="404" />
    </Container>
  );
};

export default PageNotFound;
