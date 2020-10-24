import React from "react";
import { FiPower } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import logoImage from "assets/images/logo.svg";
import { useAuthDispatch, useAuthState } from "contexts/auth/AuthContext";
import { PROFILE_PAGE_PATH } from "constants/routesPaths";
import Avatar from "components/Avatar";

import { HeaderContainer, HeaderContent, ProfileContainer } from "./styles";

const Header: React.FC = () => {
  const [t] = useTranslation();

  const { user } = useAuthState();

  const { signOut } = useAuthDispatch();

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImage} alt="GoBarber" title="GoBarber" />

        <Link to={PROFILE_PAGE_PATH}>
          <ProfileContainer>
            <Avatar
              name={user?.name}
              avatarUrl={user?.avatar_url}
            />

            <div>
              <span>
                {t("header.greeting")}
                ,
              </span>

              <strong>{user?.name}</strong>
            </div>
          </ProfileContainer>
        </Link>

        <button
          type="button"
          title={t("buttons.logout")}
          onClick={signOut}
          aria-label={t("buttons.logout")}
        >
          <FiPower />
        </button>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
