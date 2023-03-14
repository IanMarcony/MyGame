/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Avatar } from '@mui/material';
import React, { useState, useCallback, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import UserIcon from '../../assets/user.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container, ResultContainer } from './styles';

interface IResultSearch {
  url_profile_photo: string;
  name: string;
  email: string;
}

const SearchInput: React.FC = () => {
  const [results, setResults] = useState<IResultSearch[]>([]);
  const [textSearch, setTextSeach] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleAccessProfile = useCallback(
    (email: string) => {
      setTextSeach('');
      setResults([]);
      return navigate(`/dashboard/profile/${email}`);
    },
    [navigate],
  );

  const handleSearchResult = useCallback(
    (username: string) => {
      setResults([]);

      if (username.length === 0) return;
      api
        .get(`/users?username=${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setResults(response.data));
    },
    [token],
  );

  useEffect(() => {
    handleSearchResult(textSearch);
  }, [textSearch, handleSearchResult]);

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

      {results.length > 0 && (
        <ResultContainer>
          <ul>
            {results.map((item) => (
              <li
                key={item.email}
                onClick={() => handleAccessProfile(item.email)}
              >
                <Avatar
                  alt="Foto de perfil"
                  src={
                    item.url_profile_photo
                      ? `${process.env.REACT_APP_API_URL}/files/${item.url_profile_photo}`
                      : UserIcon
                  }
                  sx={{ width: 35, height: 35 }}
                />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </ResultContainer>
      )}
    </Container>
  );
};

export default SearchInput;
