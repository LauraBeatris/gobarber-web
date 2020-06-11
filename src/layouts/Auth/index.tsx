import React from 'react';

import { Container, Background, Content } from './styles';

interface AuthLayoutProps {
  backgroundPosition?: 'left' | 'right';
  backgroundImage: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  backgroundPosition = 'left',
  backgroundImage,
}) => (
  <Container backgroundPosition={backgroundPosition}>
    <Background backgroundImage={backgroundImage} />
    <Content>{children}</Content>
  </Container>
);

export default AuthLayout;
