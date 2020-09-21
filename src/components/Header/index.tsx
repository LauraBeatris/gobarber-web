import React from "react";
import { FiPower } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import logoImage from "assets/images/logo.svg";
import { useAuthDispatch, useAuthState } from "contexts/auth/AuthContext";

import { HeaderContainer, HeaderContent, ProfileContainer } from "./styles";

const Header: React.FC = () => {
  const [t] = useTranslation();

  const { user } = useAuthState();

  const { signOut } = useAuthDispatch();

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImage} alt="GoBarber" title="GoBarber" />

        <ProfileContainer>
          <img src={user?.avatar_url} alt={user?.name} />

          <div>
            <span>
              {t("header.greeting")}
              ,
            </span>

            <strong>{user?.name}</strong>
          </div>
        </ProfileContainer>

        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
