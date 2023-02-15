/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React, { useState, useCallback, useRef } from 'react';
import { BsUpload } from 'react-icons/bs';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import TextAreaInput from '../TextAreaInput';

import {
  ButtonCarrouselNext,
  ButtonCarrouselPrev,
  CarrouselFiles,
  Container,
  DropFilesArea,
  ItemCarrousel,
} from './styles';

const PublishArea: React.FC = () => {
  const filesInput = useRef<HTMLInputElement>(null);
  const carrouselRef = useRef<HTMLDivElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previewUrlFiles, setPreviewUrlFiles] = useState<string[]>([]);

  const handleSubmit = useCallback(async () => {}, []);

  const handleRemoveFile = useCallback(() => {}, []);

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
        filesUploaded.push(event.dataTransfer.files[i]);
      }

      handleFiles(filesUploaded);
    },
    [handleFiles],
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

  return (
    <Container onSubmit={handleSubmit}>
      {files.length > 0 && (
        <CarrouselFiles ref={carrouselRef} onWheel={(e) => handleWheel(e)}>
          <ButtonCarrouselPrev type="button" onClick={handlePrevItem}>
            <FiArrowLeft />
          </ButtonCarrouselPrev>
          {files.map((item, index) => {
            return (
              <ItemCarrousel key={item.name + index}>
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

          <ButtonCarrouselNext type="button" onClick={handleNextItem}>
            <FiArrowRight />
          </ButtonCarrouselNext>
        </CarrouselFiles>
      )}

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
    </Container>
  );
};

export default PublishArea;
