import React from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} aria-label="GoBarber" alt="GoBarber" />

        <form>
          <h1>Login to the platform</h1>

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

          <Button type="button">Confirm</Button>

          <a href="#">Forgot my password</a>
        </form>

        <a href="#">
          <FiLogIn />
          Create an account
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
