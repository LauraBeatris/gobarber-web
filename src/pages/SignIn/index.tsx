import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Helmet } from 'react-helmet';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';

import AuthLayout from '../../layouts/Auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import logo from '../../assets/logo.svg';
import signInBackground from '../../assets/sign-in-background.png';

import schema from './schema';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data): Promise<void> => {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      const errors = getValidationErrors(error);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <AuthLayout backgroundImage={signInBackground}>
      <Helmet>
        <title>GoBarber | SignIn</title>
      </Helmet>

      <img src={logo} aria-label="GoBarber" alt="GoBarber" />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Welcome to the platform</h1>

        <Input
          name="email"
          type="email"
          autoCapitalize="none"
          placeholder="E-mail"
          icon={FiMail}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          icon={FiLock}
        />

        <Button type="submit">Confirm</Button>

        <a href="#">Forgot my password</a>
      </Form>

      <a href="#">
        <FiLogIn />
        Create an account
      </a>
    </AuthLayout>
  );
};

export default SignIn;
