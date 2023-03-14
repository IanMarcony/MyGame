import React from 'react';

import { AuthProvider } from './auth';
import { PostsHomeProvider } from './posts.home';

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <PostsHomeProvider>{children}</PostsHomeProvider>
    </AuthProvider>
  );
};

export default AppProvider;
