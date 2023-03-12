/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useCallback, useContext, useState } from 'react';

interface IUser {
  url_profile_photo: string;
  name: string;
  email: string;
}
interface IComments {
  id: number;
  text: string;
  user: IUser;
}

interface IFilePost {
  id: number;
  filename: string;
  type: 'image' | 'video';
}

interface IPosts {
  id: number;
  id_user: number;
  description: string;
  filesPost: IFilePost[];
  is_private: boolean;
  is_liked: boolean;
  count_likes: number;
  count_comments: number;
  coments: IComments[];
  user: IUser;
}

interface PostsHomeContextData {
  getPosts(): IPosts[];
  addLastPosts(newPosts: IPosts[]): void;
  addNewPosts(newPost: IPosts): void;
}

type PostsHomeProviderProps = React.PropsWithChildren;

const PostsHomeContext = createContext<PostsHomeContextData>(
  {} as PostsHomeContextData,
);

const PostsHomeProvider: React.FC<PostsHomeProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<IPosts[]>([]);

  const addLastPosts = useCallback(
    (newPosts: IPosts[]) => {
      setPosts([...posts, ...newPosts]);
    },
    [posts],
  );

  const addNewPosts = useCallback(
    (newPost: IPosts) => {
      setPosts([newPost, ...posts]);
    },
    [posts],
  );

  const getPosts = useCallback(() => {
    return posts;
  }, [posts]);

  return (
    <PostsHomeContext.Provider value={{ addLastPosts, addNewPosts, getPosts }}>
      {children}
    </PostsHomeContext.Provider>
  );
};

const usePostsHome = function (): PostsHomeContextData {
  const context = useContext<PostsHomeContextData>(PostsHomeContext);

  if (!context) {
    throw new Error('usePostsHome must be used within PostsHomeProvider');
  }

  return context;
};

export { PostsHomeProvider, usePostsHome };
