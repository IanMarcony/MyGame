/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Avatar } from '@mui/material';
import React, { useState, useCallback } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import UserIcon from '../../assets/user.png';

import { Container, ResultContainer } from './styles';

interface IResultSearch {
  profile_image: string;
  username: string;
}

const SearchInput: React.FC = () => {
  const [results, setResults] = useState<IResultSearch[]>([
    {
      profile_image: '',
      username: '',
    },
  ]);
  const [textSearch, setTextSeach] = useState('');
  const navigate = useNavigate();

  const handleAccessProfile = useCallback(
    (email: string) => {
      setTextSeach('');
      setResults([]);
      return navigate(`/dashboard/profile/${email}`);
    },
    [navigate],
  );

  return (
    <Container>
      <FiSearch />
      <input
        type="text"
        placeholder="Pesquisar..."
        value={textSearch}
        defaultValue={textSearch}
        onChange={(e) => setTextSeach(e.target.value)}
      />

      {textSearch.length > 0 && (
        <ResultContainer>
          <ul>
            {results.length > 0 && (
              <>
                <li onClick={() => handleAccessProfile('ian@gmail.com')}>
                  <Avatar
                    alt="Foto de perfil"
                    src={UserIcon}
                    sx={{ width: 35, height: 35 }}
                  />
                  <span>Ian Marcony</span>
                </li>
                <li onClick={() => handleAccessProfile('ian@gmail.com')}>
                  <Avatar
                    alt="Foto de perfil"
                    src={UserIcon}
                    sx={{ width: 35, height: 35 }}
                  />
                  <span>Ian Marcony</span>
                </li>
                <li onClick={() => handleAccessProfile('ian@gmail.com')}>
                  <Avatar
                    alt="Foto de perfil"
                    src={UserIcon}
                    sx={{ width: 35, height: 35 }}
                  />
                  <span>Ian Marcony</span>
                </li>
                <li onClick={() => handleAccessProfile('ian@gmail.com')}>
                  <Avatar
                    alt="Foto de perfil"
                    src={UserIcon}
                    sx={{ width: 35, height: 35 }}
                  />
                  <span>Ian Marcony</span>
                </li>
                <li onClick={() => handleAccessProfile('ian@gmail.com')}>
                  <Avatar
                    alt="Foto de perfil"
                    src={UserIcon}
                    sx={{ width: 35, height: 35 }}
                  />
                  <span>Ian Marcony</span>
                </li>
              </>
            )}
          </ul>
        </ResultContainer>
      )}
    </Container>
  );
};

export default SearchInput;
