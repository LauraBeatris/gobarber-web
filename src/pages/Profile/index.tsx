import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import {
  FiLock,
  FiMail,
  FiUser,
  FiCamera,
  FiArrowLeft,
} from "react-icons/fi";
import { useHistory } from "react-router-dom";

import { useAuthState } from "contexts/auth/AuthContext";
import Input from "components/Input";
import Button from "components/Button";
import Image from "components/Image";

import { AvatarInput, Container, Content } from "./styles";

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [t] = useTranslation();

  const { user } = useAuthState();

  const { loading } = useAuthState();

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleSubmit = useCallback(
    (): void => {
      // TODO -> Update profile
    },
    [],
  );

  return (
    <Container>
      <header>
        <div>
          <button type="button" onClick={handleGoBack}>
            <FiArrowLeft />
          </button>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={user}
        >
          <AvatarInput>
            <Image
              src={user.avatar_url}
              alt={user.name}
              title={user.name}
              aria-label={user.name}
            />

            <label htmlFor="avatar">
              <FiCamera />

              <input type="file" id="avatar" />
            </label>

          </AvatarInput>

          <h1>{t("profile.title")}</h1>

          <Input
            name="name"
            type="text"
            icon={FiUser}
            placeholder={t("auth_form.full_name")}
            autoCapitalize="none"
          />

          <Input
            name="email"
            type="email"
            icon={FiMail}
            placeholder={t("auth_form.email")}
            autoCapitalize="none"
          />

          <Input
            name="old_password"
            type="password"
            icon={FiLock}
            placeholder={t("update_profile_form.current_password")}
            autoComplete="current-password"
          />

          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder={t("auth_form.password")}
            autoComplete="new-password"
          />

          <Input
            name="password_confirmation"
            type="password"
            icon={FiLock}
            placeholder={t("update_profile_form.password_confirmation")}
            autoComplete="new-password"
          />

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {t("buttons.confirm_changes")}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
