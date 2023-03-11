import React, { useState, useEffect, useCallback } from 'react';
import Posts from '../../components/Post';
import PublishArea from '../../components/PublishArea';
import { useAuth } from '../../hooks/auth';
import { usePostsHome } from '../../hooks/posts.home';
import api from '../../services/api';

import { Container, PostsArea } from './styles';

const Home: React.FC = () => {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const { getPosts, addLastPosts } = usePostsHome();

  const handleLoadPosts = useCallback(async () => {
    if (loading) {
      return;
    }
    if (total > 0 && getPosts().length === total) {
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

    addLastPosts(newPosts);

    setTotal(count);
    setPage(page + 1);
    setLoading(false);
  }, [loading, total, getPosts, page, token, addLastPosts]);

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
    <Container onScroll={(e) => handleInifiteScroll(e)}>
      <PublishArea />
      <PostsArea>
        {getPosts().length > 0 &&
          getPosts().map((item) => {
            return <Posts key={item.id} value={item} />;
          })}
      </PostsArea>
    </Container>
  );
};

export default Home;
