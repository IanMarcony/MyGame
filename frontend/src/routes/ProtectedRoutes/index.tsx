import React from 'react';

import { Routes as Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home';

import Layout from '../../pages/Layout';
import Notifications from '../../pages/Notifications';

import RequireAuth from '../../security/RequireAuth';

const ProtectedRoutes: React.FC = () => {
  return (
    <RequireAuth>
      <Switch>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Switch>
    </RequireAuth>
  );
};

export default ProtectedRoutes;
