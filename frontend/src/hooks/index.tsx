import React from 'react';

import { AuthProvider } from './auth';
import { PostsHomeProvider } from './posts.home';
import { ProgressLoadingProvider } from './progress';
import { ToastProvider } from './toast';

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <ProgressLoadingProvider>
          <PostsHomeProvider>{children}</PostsHomeProvider>
        </ProgressLoadingProvider>
      </ToastProvider>
    </AuthProvider>
  );
};

export default AppProvider;
