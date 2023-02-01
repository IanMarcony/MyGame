import React from 'react';

import { Routes as Switch, Route } from 'react-router-dom';

import Dashboard from '../../pages/Dashboard';

import RequireAuth from '../../security/RequireAuth';

const ProtectedRoutes: React.FC = () => {
  return (
    <RequireAuth>
      <Switch>
        <Route path="/" element={<Dashboard />} />
      </Switch>
    </RequireAuth>
  );
};

export default ProtectedRoutes;
