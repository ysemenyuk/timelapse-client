import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { userActions } from '../../store/userSlice.js';

function NavBar() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(userActions.logout());
  };

  return (
    <Navbar className="navbar-expand-lg navbar-light bg-light mb-4">
      <Container className="px-3">
        <Link className="navbar-brand mb-0 h1" to="/">
          Timelapse
        </Link>
        <Choose>
          <When condition={isLoggedIn}>
            <>
              <Nav className="collapse navbar-collapse">
                <Nav.Item as="li">
                  <Link className="nav-link" to="/">
                    All cameras
                  </Link>
                </Nav.Item>
              </Nav>
              <Link className="" to="/user">
                User
              </Link>
              <Button onClick={logoutHandler} variant="link" className="me-2">
                LogOut
              </Button>
            </>
          </When>
          <Otherwise>
            <div>
              <Link className="me-3" to="/login">
                LogIn
              </Link>
              <Link className="me-3" to="/signup">
                SignUp
              </Link>
            </div>
          </Otherwise>
        </Choose>
      </Container>
    </Navbar>
  );
}

export default NavBar;
