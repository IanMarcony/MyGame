import React from 'react';

import Layout from '../../pages/Layout';

import RequireAuth from '../../security/RequireAuth';

const ProtectedRoutes: React.FC = () => {
  return (
    <RequireAuth>
      <Layout />
    </RequireAuth>
  );
};

export default ProtectedRoutes;
