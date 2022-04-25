import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import userThunks from '../../thunks/userThunks.js';
import NavBar from '../Navbar/Navbar.jsx';
import Spinner from '../UI/Spinner.jsx';
import LoginPage from '../../pages/LoginPage.jsx';
import SignupPage from '../../pages/SignupPage.jsx';
import ProfilePage from '../../pages/ProfilePage.jsx';
import CameraListPage from '../../pages/CamerasListPage.jsx';
import OneCameraPage from '../../pages/OneCameraPage.jsx';

function PrivateRoute({ children, ...rest }) {
  const user = useSelector((state) => state.user);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAuth = user.isLoggedIn && userInfo && userInfo.token;
  return <Route {...rest} render={() => (isAuth ? children : <Redirect to="/login" />)} />;
}

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    user.tokenVerification && dispatch(userThunks.tokenVerification());
  }, []);

  return (
    <Container>
      <Choose>
        <When condition={user.tokenVerification}>
          <Spinner />
        </When>
        <Otherwise>
          <Router>
            <NavBar />
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignupPage} />
              <PrivateRoute>
                <Route exact path="/user" component={ProfilePage} />
                <Route exact path="/cameras/:id" component={OneCameraPage} />
                <Route exact path={['/', '/cameras']} component={CameraListPage} />
              </PrivateRoute>
              <Redirect to="/" />
            </Switch>
          </Router>
        </Otherwise>
      </Choose>
    </Container>
  );
}

export default App;
