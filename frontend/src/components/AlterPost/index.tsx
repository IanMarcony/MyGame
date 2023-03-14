/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';
import { MdPublic } from 'react-icons/md';
import { Props } from 'react-modal';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import TextAreaInput from '../TextAreaInput';

import { Container, Content, Header } from './styles';

interface IFilePost {
  id: number;
  filename: string;
  type: 'image' | 'video';
}

interface IPost {
  id: number;
  id_user: number;
  description: string;
  filesPost: IFilePost[];
  is_private: boolean;
}

interface AlterPostProps extends Props {
  value: IPost;
  toggleOpenEditPostModal(): void;
}

const AlterPost: React.FC<AlterPostProps> = ({
  value: valuePost,
  toggleOpenEditPostModal,
  ...rest
}) => {
  const [isPostPublic, setViewPost] = useState(valuePost.is_private ? 0 : 1);

  const { token } = useAuth();

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        const is_private = isPostPublic === 0;

        await api.put(
          '/posts',
          {
            description: data.text_post,
            is_private,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toggleOpenEditPostModal();
      } catch (error) {
        console.log(error);
      }
    },
    [isPostPublic, token, toggleOpenEditPostModal],
  );

  const handleChangeViewPost = useCallback((event: SelectChangeEvent) => {
    setViewPost(parseInt(event.target.value, 10));
  }, []);

  return (
    <Container {...rest}>
      <Header>
        <h1>Editar publicação</h1>
        <button type="button" onClick={() => toggleOpenEditPostModal()}>
          <AiFillCloseCircle />
        </button>
      </Header>
      <Content onSubmit={handleSubmit}>
        <Select value={isPostPublic.toString()} onChange={handleChangeViewPost}>
          <MenuItem value={1}>
            <MdPublic />
            Público
          </MenuItem>
          <MenuItem value={0}>
            <FiLock />
            Somente Amigos
          </MenuItem>
        </Select>

        <TextAreaInput
          rows={4}
          placeholder="Poste alguma coisa..."
          name="text_post"
          defaultValue={valuePost.description}
        />

        <button type="submit">Salvar</button>
      </Content>
    </Container>
  );
};

export default AlterPost;
