import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate, Link, Navigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { Container, Row, Col, Form, Button, Spinner, Alert, Stack } from 'react-bootstrap';
import Heading from '../components/UI/Heading.jsx';
import { userActions } from '../redux/user/userSlice.js';
import { loginSchema } from '../utils/validations.js';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { isLoggedIn } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values, { resetForm, setSubmitting, setFieldError }) => {
      dispatch(userActions.login(values))
        .then((resp) => {
          console.log('login formik resp -', resp);
          unwrapResult(resp);
          resetForm();
          setSubmitting(false);
          navigate(from, { replace: true });
        })
        .catch((e) => {
          setSubmitting(false);
          setFieldError('auth', e.message);
          console.log('catch login formik err -', e);
        });
    },
  });

  // console.log('formik.values -', formik.values);
  // console.log('formik.errors -', formik.errors);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid>
      <Row className="justify-content-center pt-5">
        <Col md={4}>
          <Heading lvl={3} className="text-center mb-3">
            {t('log_in')}
          </Heading>

          <Form className="mb-3" onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">{t('email')}</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                id="email"
                autoComplete="email"
                isInvalid={formik.errors && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t('password')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                autoComplete="current-password"
                isInvalid={formik.errors && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              disabled={formik.isSubmitting || formik.errors.password || formik.errors.email}
              type="submit"
              variant="outline-primary"
              className="w-100 mb-3 mt-3"
            >
              {t('log_in')}
              <If condition={formik.isSubmitting}>
                <Spinner as="span" animation="border" size="sm" />
              </If>
            </Button>
          </Form>

          <If condition={formik.errors && formik.errors.auth}>
            <Alert variant="danger">{formik.errors.auth}</Alert>
          </If>

          <Stack gap={2} className="align-items-center">
            <span>{t('new_user')}</span>
            <Link to="/signup">{t('sign_up')}</Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
