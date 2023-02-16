/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/no-array-index-key */
import React, { useRef, useState, useCallback } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

import { FaComment } from 'react-icons/fa';
import {
  ActionsButtonArea,
  ActionsPostArea,
  ButtonCarrouselNext,
  ButtonCarrouselPrev,
  CarrouselFiles,
  Container,
  InfoPost,
  ItemCarrousel,
} from './styles';

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
  is_liked: boolean;
  count_likes: number;
  count_comments: number;
}

interface PostProps {
  value: IPosts;
}

const Posts: React.FC<PostProps> = ({ value }) => {
  const [isLiked, setLiked] = useState(value.is_liked);
  const [countLikes, setCountLikes] = useState(value.count_likes);
  const [countComments, setCountComments] = useState(value.count_comments);

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

  return (
    <Container>
      {value.files.length > 0 && (
        <CarrouselFiles ref={carrouselRef} onWheel={(e) => handleWheel(e)}>
          {value.files.length > 1 ? (
            <ButtonCarrouselPrev type="button" onClick={handlePrevItem}>
              <FiArrowLeft />
            </ButtonCarrouselPrev>
          ) : (
            <></>
          )}
          {value.files.map((item, index) => {
            return (
              <ItemCarrousel key={item + index}>
                {item ? (
                  <img src={item} alt={item} />
                ) : (
                  <video src={item} controls>
                    Cannot played
                  </video>
                )}
              </ItemCarrousel>
            );
          })}

          {value.files.length > 1 ? (
            <ButtonCarrouselNext type="button" onClick={handleNextItem}>
              <FiArrowRight />
            </ButtonCarrouselNext>
          ) : (
            <></>
          )}
        </CarrouselFiles>
      )}

      <p>{value.text}</p>

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
          <button type="button">
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
