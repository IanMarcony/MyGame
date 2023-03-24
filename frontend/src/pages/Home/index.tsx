import React, { useState, useEffect, useCallback } from 'react';
import { Waypoint } from 'react-waypoint';
import Posts from '../../components/Post';
import PublishArea from '../../components/PublishArea';
import { useAuth } from '../../hooks/auth';
import { usePostsHome } from '../../hooks/posts.home';
import api from '../../services/api';

import { Container, PostsArea } from './styles';

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

const Home: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const { posts, addLastPosts, addAllPosts } = usePostsHome();

  const handleLoadPosts = useCallback(async () => {
    if (loading) {
      return;
    }
    if (total > 0 && posts.length === total) {
      return;
    }
    setLoading(true);

    const { data } = await api.get(`/posts/${page}`, {
      params: { page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { count, posts: newPosts } = data;

    if (page === 1) {
      addAllPosts(newPosts);
    } else {
      addLastPosts(newPosts);
    }
    setTotal(count);
    setLoading(false);
  }, [loading, total, posts, page, token, addAllPosts, addLastPosts]);

  useEffect(() => {
    handleLoadPosts();
  }, []);

  useEffect(() => {
    handleLoadPosts();
  }, [page]);

  return (
    <Container>
      <PublishArea />
      <PostsArea>
        {posts.map((item, i) => {
          return (
            <>
              <Posts key={item.id} value={item} />
              {i === posts.length - posts.length * 0.5 && (
                <Waypoint onEnter={() => setPage(page + 1)} />
              )}
            </>
          );
        })}
      </PostsArea>
    </Container>
  );
};

export default Home;
