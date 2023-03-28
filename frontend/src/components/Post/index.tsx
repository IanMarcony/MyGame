/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-array-index-key */
import { Avatar, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FormHandles } from '@unform/core';
import React, { useCallback, useRef, useState } from 'react';
import {
  AiFillCloseCircle,
  AiFillLike,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineLike,
} from 'react-icons/ai';
import { BsSend } from 'react-icons/bs';
import { FaComment } from 'react-icons/fa';
import { FiArrowLeft, FiArrowRight, FiLock } from 'react-icons/fi';
import { MdPublic } from 'react-icons/md';
import Modal from 'react-modal';
import * as Yup from 'yup';
import UserIcon from '../../assets/user.png';
import { useAuth } from '../../hooks/auth';
import { useProgressLoading } from '../../hooks/progress';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import TextAreaInput from '../TextAreaInput';
import {
  ActionsButtonArea,
  ActionsButtonPostArea,
  ActionsPostArea,
  AddCommentArea,
  ButtonCarrouselNext,
  ButtonCarrouselPrev,
  CarrouselFiles,
  CommentItem,
  CommentsArea,
  Container,
  ContainerModalUpdate,
  ContentUpdate,
  HeaderPost,
  HeaderUpdate,
  InfoPost,
  ItemCarrousel,
  UserInfoArea,
  UserInfoCommentArea,
} from './styles';

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
interface ISubmitCommentData {
  text: string;
}

const Posts: React.FC<PostProps> = ({ value }) => {
  const [isHiddenAddComment, setIsHiddenAddComment] = useState(false);
  const [isLiked, setLiked] = useState(value.is_liked);
  const [countLikes, setCountLikes] = useState(value.count_likes);
  const [countComments, setCountComments] = useState(value.count_comments);
  const [comments, setComments] = useState<IComments[]>(value.coments);
  const [hiddenPost, setHiddenPost] = useState(false);
  const [descriptionPost, setDescriptionPost] = useState(value.description);
  const formRef = useRef<FormHandles>(null);

  const { token, user } = useAuth();
  const { addToast } = useToast();
  const { toggleLoading } = useProgressLoading();
  const [isOpenEditPostModal, setIsOpenEditPostModal] = useState(false);
  const [isPostPublic, setViewPost] = useState(value.is_private ? 0 : 1);

  const toggleOpenEditPostModal = useCallback(() => {
    setIsOpenEditPostModal(!isOpenEditPostModal);
  }, [isOpenEditPostModal]);

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
    toggleLoading();
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
    toggleLoading();

    setLiked(like);
    like ? setCountLikes(countLikes + 1) : setCountLikes(countLikes - 1);
  }, [value.id, token, isLiked, countLikes, toggleLoading]);

  const handleToggleAddCommentArea = useCallback(() => {
    setIsHiddenAddComment(!isHiddenAddComment);
  }, [isHiddenAddComment]);

  const handleSubmitComment = useCallback(
    async (data: ISubmitCommentData) => {
      try {
        toggleLoading();

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          text: Yup.string().required('Digite algo'),
        });

        await schema.validate(data, { abortEarly: false });

        const { text } = data;
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
        toggleLoading();
        setCountComments(countComments + 1);

        handleToggleAddCommentArea();
      } catch (err) {
        toggleLoading();

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
        addToast({
          title: 'Erro',
          description: 'Ocorreu algum erro ao comentar',
          type: 'error',
        });
      }
    },
    [
      addToast,
      comments,
      countComments,
      handleToggleAddCommentArea,
      toggleLoading,
      token,
      user,
      value.id,
    ],
  );

  const handleDeleteComment = useCallback(
    async (id_comment: number) => {
      toggleLoading();

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
      toggleLoading();
    },
    [comments, countComments, toggleLoading, token, value.id],
  );

  const handleDeletePost = useCallback(
    async (id_post: number) => {
      try {
        toggleLoading();

        await api.delete(`/posts`, {
          params: { id_post },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHiddenPost(true);
        toggleLoading();
      } catch (error) {
        toggleLoading();
        addToast({
          title: 'Erro',
          description: 'Ocorreu algum erro ao excluir post',
          type: 'error',
        });
      }
    },
    [addToast, toggleLoading, token],
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

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        toggleLoading();

        const is_private = isPostPublic === 0;

        await api.put(
          '/posts',
          {
            description: data.text_post,
            is_private,
            id_post: value.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toggleOpenEditPostModal();
        toggleLoading();
      } catch (error) {
        toggleLoading();
      }
    },
    [toggleLoading, isPostPublic, value.id, token, toggleOpenEditPostModal],
  );

  const handleChangeViewPost = useCallback((event: SelectChangeEvent) => {
    setViewPost(parseInt(event.target.value, 10));
  }, []);

  return (
    <>
      {!hiddenPost && (
        <Container>
          <HeaderPost>
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
            {value.user.email === user.email && (
              <ActionsButtonPostArea>
                <button
                  type="button"
                  onClick={() => handleDeletePost(value.id)}
                >
                  <AiOutlineDelete />
                </button>
                <button type="button" onClick={() => toggleOpenEditPostModal()}>
                  <AiOutlineEdit />
                </button>
              </ActionsButtonPostArea>
            )}
          </HeaderPost>
          {value.filesPost.length > 0 && (
            <CarrouselFiles ref={carrouselRef} onWheel={(e) => handleWheel(e)}>
              {value.filesPost.length > 1 ? (
                <ButtonCarrouselPrev type="button" onClick={handlePrevItem}>
                  <FiArrowLeft />
                </ButtonCarrouselPrev>
              ) : (
                <></>
              )}
              {value.filesPost.map((item) => {
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
            <AddCommentArea ref={formRef} onSubmit={handleSubmitComment}>
              <TextAreaInput placeholder="Comente algo..." name="text" />
              <button type="submit">
                <BsSend />
              </button>
            </AddCommentArea>
          )}

          <Modal
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
                backgroundColor: 'var(--background-color)',
              },
              overlay: {
                backgroundColor: '#342e2ed3',
              },
            }}
          >
            <ContainerModalUpdate>
              <HeaderUpdate>
                <h1>Editar publicação</h1>
                <button type="button" onClick={() => toggleOpenEditPostModal()}>
                  <AiFillCloseCircle />
                </button>
              </HeaderUpdate>
              <ContentUpdate onSubmit={handleSubmit}>
                <Select
                  value={isPostPublic.toString()}
                  onChange={handleChangeViewPost}
                >
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
                  defaultValue={value.description}
                />

                <button type="submit">Salvar</button>
              </ContentUpdate>
            </ContainerModalUpdate>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default Posts;
