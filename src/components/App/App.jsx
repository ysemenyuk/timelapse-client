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
import CameraPhotosManager from '../FilesManager/PhotosManager.jsx';
import CameraSettings from '../CameraSettings/CameraSettings.jsx';
import CameraVideosManager from '../FilesManager/VideosManager.jsx';
import CameraLive from '../CameraLive/CameraLive.jsx';
import CameraInfo from '../CameraInfo/CameraInfo.jsx';

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
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route
                  path="user"
                  element={(
                    <RequireAuth>
                      <ProfilePage />
                    </RequireAuth>
                  )}
                />
                <Route
                  path="cameras"
                  element={(
                    <RequireAuth>
                      <CamerasListPage />
                    </RequireAuth>
                  )}
                />
                <Route
                  path="cameras/:cameraId"
                  element={(
                    <RequireAuth>
                      <CameraPage />
                    </RequireAuth>
                  )}
                >
                  <Route path="photos" element={<CameraPhotosManager />} />
                  <Route path="videos" element={<CameraVideosManager />} />
                  <Route path="settings" element={<CameraSettings />} />
                  <Route path="info" element={<CameraInfo />} />
                  <Route path="live" element={<CameraLive />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </Otherwise>
      </Choose>
    </Container>
  );
}

export default App;
