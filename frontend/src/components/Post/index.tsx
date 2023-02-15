import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { ButtonCarrouselPrev, CarrouselFiles, Container, ItemCarrousel } from './styles';

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

interface PostProps {
  value: IPosts;
}

const Posts: React.FC<PostProps> = ({ value }) => {
  return (<Container >
    {value.files.length > 0 && (
        <CarrouselFiles ref={carrouselRef} onWheel={(e) => handleWheel(e)}>
          <ButtonCarrouselPrev type="button" onClick={handlePrevItem}>
            <FiArrowLeft />
          </ButtonCarrouselPrev>
          {value.files.map((item, index) => {
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

          <p>{value.text}</p>

     </Container>);
};

export default Posts;
