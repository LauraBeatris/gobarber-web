import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import logoImage from "assets/images/logo.svg";
import { appearFromLeft } from "styles/animations";
import AuthAnimationContainer from "styles/components/AuthAnimationContainer";
import { SIGN_IN_PAGE_PATH } from "constants/routesPaths";

import { Container, Background, Content } from "./styles";
import { AuthLayoutProps } from "./types";

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  children,
  animation = appearFromLeft,
  description,
  backgroundImage,
  backgroundPosition = "left",
}) => (
  <Container backgroundPosition={backgroundPosition}>
    <Background backgroundImage={backgroundImage} />

    <Content>
      <AuthAnimationContainer animation={animation}>
        <Helmet>
          <title>
            GoBarber |
            {" "}
            {title}
          </title>
        </Helmet>

        <Link to={SIGN_IN_PAGE_PATH}>
          <img
            src={logoImage}
            aria-label="GoBarber"
            alt="GoBarber"
            title="GoBarber"
          />
        </Link>

        <h1>{title}</h1>

        {
          description && (
            <p>{description}</p>
          )
        }

        {children}
      </AuthAnimationContainer>
    </Content>
  </Container>
);

export default AuthLayout;
