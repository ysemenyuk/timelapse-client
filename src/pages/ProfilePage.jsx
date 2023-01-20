import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Message from '../components/UI/Message.jsx';
import Heading from '../components/UI/Heading.jsx';
import Spinner from '../components/UI/Spinner.jsx';
// import Error from '../components/UI/Error.jsx';
import { userActions } from '../redux/user/userSlice.js';
import useThunkStatus from '../hooks/useThunkStatus.js';

function ProfilePage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const fetchStatus = useThunkStatus(userActions.updateOne);
  const { user } = useSelector((state) => state.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage(t('passwords_should_match'));
      return;
    }

    setMessage(null);

    const values = { name, email, password };
    dispatch(userActions.updateOne({ userId: user._id, values }))
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err -', err);
      });
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    // TODO
    console.log('delete user');
  };

  return (
    <Row className="justify-content-center">
      <Col sm={6}>
        <Heading lvl={3} className="mb-3">
          {t('profile')}
        </Heading>

        {message && <Message variant="danger">{message}</Message>}

        <Form className="mb-3" onSubmit={handleUpdateUser}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username">{t('user_name')}</Form.Label>
            <Form.Control
              type="username"
              name="username"
              id="username"
              autoComplete="username"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="email">{t('email')}</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">{t('new_password')}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="confirmPassword">{t('confirm_new_password')}</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="current-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-start align-items-center">
            <Button variant="primary" onClick={handleDeleteUser} size="sm">
              {t('delete')}
            </Button>
            <Button variant="primary" type="submit" size="sm">
              {t('update')}
            </Button>
            {fetchStatus.isLoading && <Spinner as="span" animation="border" size="sm" />}
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default ProfilePage;
