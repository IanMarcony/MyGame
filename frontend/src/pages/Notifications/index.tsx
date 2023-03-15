import React, { useState, useCallback, useEffect } from 'react';
import FriendRequest from '../../components/FriendRequest';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container } from './styles';

interface IFriendRequest {
  id: number;
  userRequester: {
    name: string;
    email: string;
    url_profile_photo: string;
  };
}

const Notifications: React.FC = () => {
  const [friendRequests, setFriendRequest] = useState<IFriendRequest[]>([]);
  const { token } = useAuth();

  const handleLoadRequests = useCallback(async () => {
    try {
      const { data: requests } = await api.get('/friends/request', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFriendRequest(requests);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  useEffect(() => {
    handleLoadRequests();
  }, []);
  return (
    <Container>
      {friendRequests.map((item) => (
        <FriendRequest key={item.id} request={item} />
      ))}
    </Container>
  );
};

export default Notifications;
