/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FormHandles } from '@unform/core';
import React, { useState, useCallback, useRef } from 'react';
import { BsUpload } from 'react-icons/bs';
import { FiArrowLeft, FiArrowRight, FiLock } from 'react-icons/fi';
import { MdPublic, MdRemoveCircle } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../hooks/auth';
import { usePostsHome } from '../../hooks/posts.home';
import { useProgressLoading } from '../../hooks/progress';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import TextAreaInput from '../TextAreaInput';

import {
  AddPostButton,
  ButtonCarrouselNext,
  ButtonCarrouselPrev,
  CarrouselFiles,
  Content,
  Container,
  DropFilesArea,
  ItemCarrousel,
} from './styles';

const PublishArea: React.FC = () => {
  const filesInput = useRef<HTMLInputElement>(null);
  const carrouselRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<FormHandles>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previewUrlFiles, setPreviewUrlFiles] = useState<string[]>([]);
  const [isPostPublic, setViewPost] = useState(1);
  const [isHiddenForm, setIsHiddenForm] = useState(true);

  const { token, user } = useAuth();
  const { addToast } = useToast();
  const { toggleLoading } = useProgressLoading();
  const toggleOpenForm = useCallback(() => {
    setIsHiddenForm(!isHiddenForm);
  }, [isHiddenForm]);

  const { addNewPosts } = usePostsHome();

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        toggleLoading();
        const formData = new FormData();
        const is_private = isPostPublic === 0;

        if (data.text_post.trim().length === 0 && files.length === 0) {
          addToast({
            title: 'Error',
            description: 'Não pode post vazio',
            type: 'error',
          });
          toggleLoading();

          return;
        }

        formData.append('description', data.text_post);
        formData.append('is_private', `${is_private}`);

        for (const fileUpload of files.reverse()) {
          formData.append(uuidv4(), fileUpload);
        }

        const response = await api.post('/posts', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const newPost = {
          ...response.data,
          coments: [],
          user,
        };

        addNewPosts(newPost);
        setFiles([]);
        setPreviewUrlFiles([]);
        setViewPost(1);
        toggleLoading();
        formRef.current?.clearField('text_post');
        toggleOpenForm();
      } catch (error) {
        toggleLoading();

        addToast({
          title: 'Error',
          description: 'Erro ao postar',
          type: 'error',
        });
      }
    },
    [
      isPostPublic,
      token,
      user,
      addNewPosts,
      toggleOpenForm,
      files,
      addToast,
      toggleLoading,
    ],
  );

  const handleFiles = useCallback(
    (filesUpload: File[] | null) => {
      if (filesUpload) {
        setFiles([...files, ...filesUpload]);
        setPreviewUrlFiles([
          ...previewUrlFiles,
          ...filesUpload.map((item) => URL.createObjectURL(item)),
        ]);
      }
    },
    [files, previewUrlFiles],
  );

  const handleOnDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    [],
  );
  const handleOnDropFiles = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const filesUploaded = [];

      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        if (
          event.dataTransfer.files[i].type.includes('video') ||
          event.dataTransfer.files[i].type.includes('image')
        ) {
          addToast({
            title: 'Error',
            description: 'Somente envie vídeo ou imagens',
            type: 'error',
          });
        }
        filesUploaded.push(event.dataTransfer.files[i]);
      }

      handleFiles(filesUploaded);
    },
    [handleFiles, addToast],
  );

  const handleFormatOnChangeInput = useCallback(
    (filesUpload: FileList | null) => {
      if (!filesUpload) return;

      const filesUploaded = [];

      for (let i = 0; i < filesUpload.length; i++) {
        filesUploaded.push(filesUpload[i]);
      }
      handleFiles(filesUploaded);
    },
    [handleFiles],
  );

  const handleFilesClick = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    filesInput.current && filesInput.current.click();
  }, [filesInput]);

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

  const handleRemoveFileUploaded = useCallback((index: number) => {
    setFiles((old) => old.filter((item, indexOld) => indexOld !== index));
  }, []);

  const handleChangeViewPost = useCallback((event: SelectChangeEvent) => {
    setViewPost(parseInt(event.target.value, 10));
  }, []);

  return (
    <Container>
      <AddPostButton type="button" onClick={() => toggleOpenForm()}>
        {isHiddenForm ? 'Nova publicação' : 'Fechar'}
      </AddPostButton>

      {!isHiddenForm && (
        <Content ref={formRef} onSubmit={handleSubmit}>
          {files.length > 0 && (
            <CarrouselFiles ref={carrouselRef} onWheel={(e) => handleWheel(e)}>
              {files.length > 1 ? (
                <ButtonCarrouselPrev type="button" onClick={handlePrevItem}>
                  <FiArrowLeft />
                </ButtonCarrouselPrev>
              ) : (
                <></>
              )}
              {files.map((item, index) => {
                return (
                  <ItemCarrousel key={item.name + index}>
                    <button
                      type="button"
                      onClick={() => handleRemoveFileUploaded(index)}
                    >
                      <MdRemoveCircle />
                    </button>
                    {item.type.includes('image') ? (
                      <img src={previewUrlFiles[index]} alt={item.name} />
                    ) : (
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      <video src={previewUrlFiles[index]} controls>
                        Cannot played
                      </video>
                    )}
                  </ItemCarrousel>
                );
              })}

              {files.length > 1 ? (
                <ButtonCarrouselNext type="button" onClick={handleNextItem}>
                  <FiArrowRight />
                </ButtonCarrouselNext>
              ) : (
                <></>
              )}
            </CarrouselFiles>
          )}

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
          />

          <DropFilesArea
            onDragOver={handleOnDragOver}
            onDrop={handleOnDropFiles}
            onClick={handleFilesClick}
          >
            <p>
              Arraste e solte alguma imagem ou vídeo <BsUpload />{' '}
            </p>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, video/* "
              ref={filesInput}
              hidden
              onChange={(e) =>
                handleFormatOnChangeInput(e.target.files && e.target.files)
              }
            />
          </DropFilesArea>

          <button type="submit">Postar</button>
        </Content>
      )}
    </Container>
  );
};

export default PublishArea;
