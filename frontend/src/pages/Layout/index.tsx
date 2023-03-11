import { Avatar } from '@mui/material';
import React from 'react';
import { FiBell, FiHome, FiLogOut, FiMessageCircle } from 'react-icons/fi';
import { Link, Outlet } from 'react-router-dom';

import SearchInput from '../../components/SearchInput';
import { useAuth } from '../../hooks/auth';
import UserIcon from '../../assets/user.png';

import {
  NavHeader,
  ContentButtonContainer,
  UserButtonsContainer,
} from './styles';

const Layout: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <>
      <NavHeader>
        <SearchInput />

        <ContentButtonContainer>
          <Link to="/dashboard">
            <FiHome />
          </Link>

          <Link to="/dashboard/notifications">
            <FiBell />
          </Link>
        </ContentButtonContainer>

        <UserButtonsContainer>
          <Link to={`/dashboard/profile/${user.email}`}>
            <Avatar
              alt="Foto de perfil"
              src={
                user.url_profile_photo
                  ? `${process.env.REACT_APP_API_URL}/files/${user.url_profile_photo}`
                  : UserIcon
              }
              sx={{ width: 35, height: 35 }}
            />
          </Link>

          <Link to="/dashboard/chat">
            <FiMessageCircle />
          </Link>

          <Link to="/" onClick={signOut}>
            <FiLogOut />
          </Link>
        </UserButtonsContainer>
      </NavHeader>
      <Outlet />
    </>
  );
};

export default Layout;
