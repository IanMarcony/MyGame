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
  posts: IPosts[];
  addLastPosts(newPosts: IPosts[]): void;
  addAllPosts(newPosts: IPosts[]): void;
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
      const temp = [...posts, ...newPosts];

      setPosts(
        temp.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.id === value.id),
        ),
      );
    },
    [posts],
  );

  const addAllPosts = useCallback((newPosts: IPosts[]) => {
    setPosts(newPosts);
  }, []);

  const addNewPosts = useCallback(
    (newPost: IPosts) => {
      setPosts([newPost, ...posts]);
    },
    [posts],
  );

  return (
    <PostsHomeContext.Provider
      value={{ addAllPosts, addLastPosts, addNewPosts, posts }}
    >
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
