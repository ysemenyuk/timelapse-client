import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { userActions } from '../../redux/user/userSlice.js';

function NavBar() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { t, i18n } = useTranslation();

  const logoutHandler = () => {
    dispatch(userActions.logout());
  };

  const selectLng = (key) => () => {
    i18n.changeLanguage(key);
  };

  return (
    <Navbar className="bg-light mb-4">
      <Container className="px-3">
        <Navbar.Brand as={Link} to="/cameras" className="mr-auto">
          Timelapse
        </Navbar.Brand>

        <If condition={isLoggedIn}>
          <Nav className="collapse navbar-collapse">
            <Nav.Item as="li">
              <Link className="nav-link" to="/cameras">
                {t('cameras')}
              </Link>
            </Nav.Item>
          </Nav>
        </If>

        <div className="d-flex gap-3 justify-content-start align-items-center">
          <NavDropdown title={t('name')} id="lng">
            <NavDropdown.Item onClick={selectLng('en')}>En</NavDropdown.Item>
            <NavDropdown.Item onClick={selectLng('ru')}>Ru</NavDropdown.Item>
          </NavDropdown>

          <If condition={isLoggedIn}>

            <span className="navbar-text">
              |
            </span>

            <Link className="" to="/user">
              {t('profile')}
            </Link>
            <Button onClick={logoutHandler} variant="link">
              {t('exit')}
            </Button>
          </If>

        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
