import React, { useState, useEffect, useCallback } from 'react';
import Posts from '../../components/Post';
import PublishArea from '../../components/PublishArea';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container, PostsArea } from './styles';

interface IPosts {
  id: number;
  text: string;
  files: string[];
  is_liked: boolean;
  count_likes: number;
  count_comments: number;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

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

    console.log(data);

    const { count, posts: newPosts } = data;

    setPosts([...posts, ...newPosts]);

    setTotal(count);
    setPage(page + 1);
    setLoading(false);
  }, [loading, page, posts, total, token]);

  const handleInifiteScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const bottom =
        e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
        e.currentTarget.clientHeight;
      if (bottom) {
        handleLoadPosts();
      }
    },
    [handleLoadPosts],
  );

  useEffect(() => {
    handleLoadPosts();
  }, []);

  return (
    <Container>
      <PublishArea />
      <PostsArea onScroll={(e) => handleInifiteScroll(e)}>
        {posts.length > 0 &&
          posts.map((item) => {
            return <Posts key={item.id} value={item} />;
          })}
      </PostsArea>
    </Container>
  );
};

export default Home;
