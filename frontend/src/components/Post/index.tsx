/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-array-index-key */
import React, { useRef, useState, useCallback } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { Avatar } from '@mui/material';
import UserIcon from '../../assets/user.png';
import {
  ActionsButtonArea,
  ActionsPostArea,
  ButtonCarrouselNext,
  ButtonCarrouselPrev,
  CarrouselFiles,
  Container,
  InfoPost,
  ItemCarrousel,
  UserInfoArea,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface IUser {
  url_profile_photo: string;
  name: string;
  email: string;
}

interface IComments {
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
  is_liked: boolean;
  count_likes: number;
  count_comments: number;
  user: IUser;
}

interface PostProps {
  value: IPosts;
}

const Posts: React.FC<PostProps> = ({ value }) => {
  const [isLiked, setLiked] = useState(value.is_liked);
  const [countLikes, setCountLikes] = useState(value.count_likes);
  const [countComments, setCountComments] = useState(value.count_comments);
  const { token } = useAuth();

  const carrouselRef = useRef<HTMLDivElement>(null);
  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement> | undefined) => {
      if (e) {
        if (e.deltaY > 0) {
          carrouselRef.current?.scrollBy(300, 0);
        } else {
          carrouselRef.current?.scrollBy(-300, 0);
        }
      }
    },
    [],
  );

  const handlePrevItem = useCallback(() => {
    carrouselRef.current?.scrollBy(-300, 0);
  }, []);
  const handleNextItem = useCallback(() => {
    carrouselRef.current?.scrollBy(300, 0);
  }, []);

  const handleLikePost = useCallback(async () => {
    await api.put(
      '/posts/likes',
      {
        id_user: value.id_user,
        id_post: value.id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const like = !isLiked;
    setLiked(like);
    like ? setCountLikes(countLikes + 1) : setCountLikes(countLikes - 1);
  }, [value.id_user, value.id, token, isLiked, countLikes]);

  return (
    <Container>
      <UserInfoArea to={`/dashboard/profile/${value.user.email}`}>
        <Avatar
          alt="Foto de perfil"
          src={
            value.user.url_profile_photo
              ? `${process.env.REACT_APP_API_URL}/files/${value.user.url_profile_photo}`
              : UserIcon
          }
          sx={{ width: 35, height: 35 }}
        />

        {value.user.name}
      </UserInfoArea>
      {value.filesPost.length > 0 && (
        <CarrouselFiles ref={carrouselRef} onWheel={(e) => handleWheel(e)}>
          {value.filesPost.length > 1 ? (
            <ButtonCarrouselPrev type="button" onClick={handlePrevItem}>
              <FiArrowLeft />
            </ButtonCarrouselPrev>
          ) : (
            <></>
          )}
          {value.filesPost.map((item, index) => {
            return (
              <ItemCarrousel key={item.id}>
                {item.type === 'image' ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/files/${item.filename}`}
                    alt={item.filename}
                  />
                ) : (
                  <video
                    src={`${process.env.REACT_APP_API_URL}/files/${item.filename}`}
                    controls
                  >
                    Cannot played
                  </video>
                )}
              </ItemCarrousel>
            );
          })}

          {value.filesPost.length > 1 ? (
            <ButtonCarrouselNext type="button" onClick={handleNextItem}>
              <FiArrowRight />
            </ButtonCarrouselNext>
          ) : (
            <></>
          )}
        </CarrouselFiles>
      )}

      <p>{value.description}</p>

      <ActionsPostArea>
        <InfoPost>
          <span>
            {countLikes} {countLikes > 1 ? 'curtidas' : 'curtida'}
          </span>
          <span>
            {countComments} {countComments > 1 ? 'comentários' : 'comentario'}
          </span>
        </InfoPost>

        <ActionsButtonArea>
          <button type="button" onClick={() => handleLikePost()}>
            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
          </button>
          <button type="button">
            <FaComment />
          </button>
        </ActionsButtonArea>
      </ActionsPostArea>
    </Container>
  );
};

export default Posts;
