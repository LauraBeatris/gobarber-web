import React, { ChangeEvent, useCallback, useRef } from "react";
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
import useLocalStorage from "@rehooks/local-storage";

import { useAuthState } from "contexts/auth/AuthContext";
import Input from "components/Input";
import Button from "components/Button";
import Image from "components/Image";
import api from "settings/api";
import { useToastsDispatch } from "contexts/toasts/ToastsContext";
import { USER_STORAGE_KEY } from "constants/localStorage";
import { User } from "shared/types/apiSchema";
import getUserImagePlaceholder from "utils/getUserImagePlaceholder";

import { AvatarInput, Container, Content } from "./styles";

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [user, setUser] = useLocalStorage<User>(
    USER_STORAGE_KEY,
    {} as User,
  );

  const [t] = useTranslation();
  const history = useHistory();

  const { addToast } = useToastsDispatch();
  const { loading } = useAuthState();

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const handleAvatarChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    const formData = new FormData();

    formData.append("avatar", file);

    api.patch<User>("/users/avatar", formData)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        addToast({
          title: error.message,
          type: "error",
        });
      });
  }, [
    setUser,
    addToast,
  ]);

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
              fallbackSrc={getUserImagePlaceholder(user?.name)}
            />

            <label htmlFor="avatar">
              <FiCamera />

              <input
                id="avatar"
                type="file"
                onChange={handleAvatarChange}
              />
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
