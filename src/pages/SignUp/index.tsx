import React from 'react';
import { FiLogIn, FiLock, FiMail, FiUser } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} aria-label="GoBarber" alt="GoBarber" />

        <form>
          <h1>Create an account</h1>

          <Input
            name="name"
            type="text"
            autoCapitalize="none"
            placeholder="Full name"
            icon={FiUser}
          />
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
        </form>

        <a href="#">
          <FiLogIn />
          Already have an account? Log in
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
