/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-array-index-key */
import React, { useRef, useState, useCallback } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import {
  AiFillLike,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineLike,
} from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { Avatar } from '@mui/material';
import { BsSend } from 'react-icons/bs';
import Modal from 'react-modal';
import UserIcon from '../../assets/user.png';
import {
  ActionsButtonArea,
  ActionsPostArea,
  AddCommentArea,
  ButtonCarrouselNext,
  ButtonCarrouselPrev,
  CarrouselFiles,
  CommentItem,
  CommentsArea,
  Container,
  InfoPost,
  ItemCarrousel,
  UserInfoArea,
  UserInfoCommentArea,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import TextAreaInput from '../TextAreaInput';
import AlterPost from '../AlterPost';
import { useModalEditPost } from '../../hooks/modal.edit.post';

interface IUser {
  url_profile_photo?: string;
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
  is_liked: boolean;
  is_private: boolean;
  count_likes: number;
  count_comments: number;
  coments: IComments[];
  user: IUser;
}

interface PostProps {
  value: IPosts;
}

const Posts: React.FC<PostProps> = ({ value }) => {
  const [isHiddenAddComment, setIsHiddenAddComment] = useState(false);
  const [isLiked, setLiked] = useState(value.is_liked);
  const [countLikes, setCountLikes] = useState(value.count_likes);
  const [countComments, setCountComments] = useState(value.count_comments);
  const [comments, setComments] = useState<IComments[]>(value.coments);
  const [hiddenPost, setHiddenPost] = useState(false);
  const [descriptionPost, setDescriptionPost] = useState(value.description);

  const { token, user } = useAuth();
  const { isOpenEditPostModal, toggleOpenEditPostModal } = useModalEditPost();

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
  }, [value.id, token, isLiked, countLikes]);

  const handleToggleAddCommentArea = useCallback(() => {
    setIsHiddenAddComment(!isHiddenAddComment);
  }, [isHiddenAddComment]);

  const handleSubmitComment = useCallback(
    async (data: any) => {
      const { text } = data;

      if (text.length === 0) {
        alert('Digite pelo menos algo pro post');
        return;
      }

      const response = await api.post(
        '/posts/comments',
        {
          text,
          id_post: value.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setComments([
        {
          id: response.data.id,
          text,
          user,
        },
        ...comments,
      ]);
      setCountComments(countComments + 1);

      handleToggleAddCommentArea();
    },
    [
      comments,
      countComments,
      handleToggleAddCommentArea,
      token,
      user,
      value.id,
    ],
  );

  const handleDeleteComment = useCallback(
    async (id_comment: number) => {
      await api.delete(
        `/posts/comments?id_comment=${id_comment}&id_post=${value.id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setComments(comments.filter((item) => item.id !== id_comment));
      setCountComments(countComments - 1);
    },
    [comments, countComments, token, value.id],
  );

  const handleDeletePost = useCallback(
    async (id_post: number) => {
      try {
        await api.delete(`/posts`, {
          params: { id_post },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHiddenPost(true);
      } catch (error) {
        console.error(error);
      }
    },
    [token],
  );

  const handleReloadPost = useCallback(async () => {
    const { data: postReload } = await api.get('/posts', {
      params: {
        id_post: value.id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDescriptionPost(postReload.description);
  }, [token, value.id]);

  return (
    <>
      {!hiddenPost && (
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
            {value.user.email === user.email && (
              <div id="actions">
                <button
                  type="button"
                  onClick={() => handleDeletePost(value.id)}
                >
                  <AiOutlineDelete />
                </button>
                <button type="button" onClick={() => toggleOpenEditPostModal()}>
                  <AiOutlineEdit />
                </button>
              </div>
            )}
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

          <p>{descriptionPost}</p>

          <ActionsPostArea>
            <InfoPost>
              <span>
                {countLikes} {countLikes > 1 ? 'curtidas' : 'curtida'}
              </span>
              <span>
                {countComments}{' '}
                {countComments > 1 ? 'comentários' : 'comentario'}
              </span>
            </InfoPost>

            <ActionsButtonArea>
              <button type="button" onClick={() => handleLikePost()}>
                {isLiked ? <AiFillLike /> : <AiOutlineLike />}
              </button>
              <button
                type="button"
                onClick={() => handleToggleAddCommentArea()}
              >
                <FaComment />
              </button>
            </ActionsButtonArea>
          </ActionsPostArea>

          {comments.length > 0 && (
            <CommentsArea>
              {comments.map((item) => (
                <CommentItem key={item.id}>
                  <section>
                    <UserInfoCommentArea
                      to={`/dashboard/profile/${item.user.email}`}
                    >
                      <Avatar
                        alt="Foto de perfil"
                        src={
                          item.user.url_profile_photo
                            ? `${process.env.REACT_APP_API_URL}/files/${item.user.url_profile_photo}`
                            : UserIcon
                        }
                        sx={{ width: 35, height: 35 }}
                      />

                      {item.user.name}
                    </UserInfoCommentArea>
                    {item.user.email === user.email && (
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(item.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    )}
                  </section>
                  <p>{item.text}</p>
                </CommentItem>
              ))}
            </CommentsArea>
          )}

          {isHiddenAddComment && (
            <AddCommentArea onSubmit={handleSubmitComment}>
              <TextAreaInput placeholder="Comente algo..." name="text" />
              <button type="submit">
                <BsSend />
              </button>
            </AddCommentArea>
          )}

          <AlterPost
            isOpen={isOpenEditPostModal}
            onRequestClose={toggleOpenEditPostModal}
            onAfterClose={handleReloadPost}
            style={{
              content: {
                height: 'max-content',
                padding: '15px',
                borderRadius: '10px',
                border: '2px solid var(--text-color)',
                margin: '4% auto 0 auto',
                width: '80%',
              },
              overlay: {
                backgroundColor: '#342e2ed3',
              },
            }}
            value={value}
          />
        </Container>
      )}
    </>
  );
};

export default Posts;
