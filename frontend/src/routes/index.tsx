import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import ChangePassword from '../pages/ChangePassword';
import ForgotPassword from '../pages/ForgotPassword';
import PageNotFound from '../pages/PageNotFound';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ProtectedRoutes from './ProtectedRoutes';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/change" element={<ChangePassword />} />
      <Route path="/dashboard" element={<ProtectedRoutes />} />
      <Route path="*" element={<PageNotFound />} />
    </Switch>
  );
};

export default Routes;
