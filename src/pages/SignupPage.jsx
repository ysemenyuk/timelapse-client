import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Form, Button, Spinner, Alert, Stack } from 'react-bootstrap';
import Heading from '../components/UI/Heading.jsx';
import { userActions } from '../redux/user/userSlice.js';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoggedIn } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string().required().oneOf([Yup.ref('password')]),
    }),
    onSubmit: (values, { resetForm, setSubmitting, setFieldError }) => {
      dispatch(userActions.singup(values))
        .then((resp) => {
          unwrapResult(resp);
          resetForm();
          setSubmitting(false);
          navigate('/cameras');
        })
        .catch((e) => {
          setSubmitting(false);
          setFieldError('auth', e.message);
          console.log('catch formik err -', e);
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
            {t('sign_up')}
          </Heading>

          <Form className="mb-3" onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">{t('email')}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
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
                name="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
                isInvalid={formik.errors && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t('confirm_password')}</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                isInvalid={formik.errors && formik.errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors && formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              disabled={formik.isSubmitting || formik.errors.password || formik.errors.email}
              type="submit"
              variant="outline-primary"
              className="w-100 mb-3 mt-3"
            >
              {t('sign_up')}
              <If condition={formik.isSubmitting}>
                <Spinner as="span" animation="border" size="sm" />
              </If>
            </Button>
          </Form>

          <If condition={formik.errors && formik.errors.auth}>
            <Alert variant="danger">{formik.errors.auth}</Alert>
          </If>

          <Stack gap={1} className="align-items-center">
            <span>{t('have_accaunt')}</span>
            <Link to="/login">{t('log_in')}</Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
