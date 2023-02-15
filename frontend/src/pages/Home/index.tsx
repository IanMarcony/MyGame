import React, { useState } from 'react';
import Posts from '../../components/Post';
import PublishArea from '../../components/PublishArea';

import { Container, PostsArea } from './styles';

interface IComments {
  text: string;
  user: {
    profile_image: string;
    username: string;
  };
}

interface IPosts {
  id: number;
  text: string;
  files: string[];
  count_likes: number;
  count_comments: number;
  comments: IComments[];
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<IPosts[]>([]);

  return (
    <Container>
      <PublishArea />
      <PostsArea>
        {posts.length > 0 &&
          posts.map((item) => {
            return <Posts key={item.id} value={item} />;
          })}
      </PostsArea>
    </Container>
  );
};

export default Home;
