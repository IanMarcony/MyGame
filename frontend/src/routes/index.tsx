import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import ChangePassword from '../pages/ChangePassword';
import Chat from '../pages/Chat';
import ForgotPassword from '../pages/ForgotPassword';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import PageNotFound from '../pages/PageNotFound';
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ProtectedRoutes from './ProtectedRoutes';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/change" element={<ChangePassword />} />
      <Route path="/dashboard" element={<ProtectedRoutes />}>
        <Route index element={<Home />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile/:email" element={<Profile />} />
        <Route path="chat" element={<Chat />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Switch>
  );
};

export default Routes;
