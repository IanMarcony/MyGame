import React from 'react';

import { AuthProvider } from './auth';
import { ModalEditPostProvider } from './modal.edit.post';
import { PostsHomeProvider } from './posts.home';

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <PostsHomeProvider>
        <ModalEditPostProvider>{children}</ModalEditPostProvider>
      </PostsHomeProvider>
    </AuthProvider>
  );
};

export default AppProvider;
