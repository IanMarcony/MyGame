import { Avatar } from '@mui/material';
import React from 'react';
import { FiBell, FiHome, FiLogOut } from 'react-icons/fi';
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
              src={UserIcon}
              sx={{ width: 35, height: 35 }}
            />
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
