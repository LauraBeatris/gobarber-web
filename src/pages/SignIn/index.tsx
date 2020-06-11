import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logo from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';


const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img
          src={logo}
          aria-label="GoBarber"
          alt="GoBarber"
        />

        <form>
          <h1>Login to the platform</h1>

          <input
            type="email"
            autoCapitalize="none"
            placeholder="E-mail"
          />
          <input
            type="password"
            placeholder="Password"
          />

          <button type="button">
            Confirm
          </button>

          <a href="#">Forgot my password</a>
        </form>

        <a href="#">
          <FiLogIn />
          Create an account
        </a>
      </Content>
      <Background />
    </Container>
  )
};

export default SignIn;
