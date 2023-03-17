/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useCallback } from 'react';
import { GiCancel, GiConfirmed } from 'react-icons/gi';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import UserIcon from '../../assets/user.png';

import {
  ActionsButtonsArea,
  Container,
  Content,
  UserImageArea,
} from './styles';

interface IFriendRequest {
  id: number;
  userRequester: {
    name: string;
    email: string;
    url_profile_photo: string;
  };
}

interface FriendRequestProps {
  request: IFriendRequest;
}

const FriendRequest: React.FC<FriendRequestProps> = ({ request }) => {
  const [hiddenRequest, setHiddenRequest] = useState(false);
  const { token } = useAuth();

  const handleConfirmRequest = useCallback(async () => {
    await api.put(
      `/friends/request`,
      { id_request: request.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setHiddenRequest(true);
  }, [request.id, token]);

  const handleDeleteRequest = useCallback(async () => {
    await api.delete(`/friends/request`, {
      params: { id_request: request.id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setHiddenRequest(true);
  }, [request.id, token]);

  return (
    <>
      {!hiddenRequest && (
        <Container>
          <UserImageArea>
            <img
              src={
                request.userRequester.url_profile_photo
                  ? `${process.env.REACT_APP_API_URL}/files/${request.userRequester.url_profile_photo}`
                  : UserIcon
              }
              alt={request.userRequester.name}
            />
          </UserImageArea>
          <Content>
            <span>
              <strong>{request.userRequester.name}</strong> enviou uma
              solicitação de amizade para você
            </span>
            <ActionsButtonsArea>
              <button type="button" onClick={() => handleConfirmRequest()}>
                <GiConfirmed />
              </button>
              <button type="button" onClick={() => handleDeleteRequest()}>
                <GiCancel />
              </button>
            </ActionsButtonsArea>
          </Content>
        </Container>
      )}
    </>
  );
};

export default FriendRequest;
