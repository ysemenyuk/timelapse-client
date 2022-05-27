import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { userActions } from '../../redux/user/userSlice.js';
import Spinner from '../UI/Spinner.jsx';
import LoginPage from '../../pages/LoginPage.jsx';
import SignupPage from '../../pages/SignupPage.jsx';
import ProfilePage from '../../pages/ProfilePage.jsx';
import CamerasListPage from '../../pages/CamerasListPage.jsx';
import CameraPage from '../../pages/CameraPage.jsx';
import HomePage from '../../pages/HomePage.jsx';
import MainLayout from '../../layouts/MainLayout.jsx';
import SocketContext from '../../context/SocketContext.js';

function RequireAuth({ children }) {
  const user = useSelector((state) => state.user);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAuth = user.isLoggedIn && userInfo && userInfo.token;
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  const dispatch = useDispatch();
  const { connectSocket, disconnectSocket } = useContext(SocketContext);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    console.log(11111, 'useEffect connectSocket');

    if (user.isLoggedIn) {
      connectSocket(user);
    }
    return () => {
      disconnectSocket();
    };
  }, [user.isLoggedIn]);

  useEffect(() => {
    if (user.tokenVerification) {
      dispatch(userActions.tokenVerification());
    }
  }, []);

  return (
    <Container>
      <Choose>
        <When condition={user.tokenVerification}>
          <Spinner />
        </When>
        <Otherwise>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/user"
                  element={(
                    <RequireAuth>
                      <ProfilePage />
                    </RequireAuth>
                  )}
                />
                <Route
                  path="/cameras"
                  element={(
                    <RequireAuth>
                      <CamerasListPage />
                    </RequireAuth>
                  )}
                />
                <Route
                  path="/cameras/:id"
                  element={(
                    <RequireAuth>
                      <CameraPage />
                    </RequireAuth>
                  )}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </Otherwise>
      </Choose>
    </Container>
  );
}

export default App;
