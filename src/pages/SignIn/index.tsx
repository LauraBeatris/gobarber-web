import React, { useCallback } from 'react';
import { Form } from '@unform/web';
import { Helmet } from 'react-helmet';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';

import AuthLayout from '../../layouts/Auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';
import signInBackground from '../../assets/sign-in-background.png';

const SignIn: React.FC = () => {
  const handleSubmit = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <AuthLayout backgroundImage={signInBackground}>
      <Helmet>
        <title>GoBarber | SignIn</title>
      </Helmet>

      <img src={logo} aria-label="GoBarber" alt="GoBarber" />

      <Form onSubmit={handleSubmit}>
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
