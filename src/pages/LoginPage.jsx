import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Form, Button, Spinner, Alert, Stack } from 'react-bootstrap';
import Heading from '../components/UI/Heading.jsx';
import userThunks from '../thunks/userThunks.js';

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoggedIn } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required().min(6),
    }),
    onSubmit: (values, { resetForm, setSubmitting, setFieldError }) => {
      dispatch(userThunks.login(values))
        .then((resp) => {
          console.log('login formik resp -', resp);
          unwrapResult(resp);
          resetForm();
          setSubmitting(false);
          history.push('/');
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
    return <Redirect to="/" />;
  }

  return (
    <Container fluid>
      <Row className="justify-content-center pt-5">
        <Col md={3}>
          <Heading lvl={3} className="text-center mb-3">
            Log In
          </Heading>

          <Form className="mb-3" onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email</Form.Label>
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
              <Form.Label>Password</Form.Label>
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
              LogIn
              <If condition={formik.isSubmitting}>
                <Spinner as="span" animation="border" size="sm" />
              </If>
            </Button>
          </Form>

          <If condition={formik.errors && formik.errors.auth}>
            <Alert variant="danger">{formik.errors.auth}</Alert>
          </If>

          <Stack gap={2} className="align-items-center">
            <span>New user?</span>
            <Link to="/signup">Sign Up</Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
