import React, {
  ChangeEvent,
  useCallback,
  useRef,
} from "react";
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
import noop from "lodash.noop";

import Input from "components/Input";
import Button from "components/Button";
import { USER_STORAGE_KEY } from "constants/localStorage";
import { User } from "shared/types/apiSchema";
import ShowPasswordInput from "components/Input/ShowPasswordInput";
import { DASHBOARD_PAGE_PATH } from "constants/routesPaths";
import Avatar from "components/Avatar";
import useUpdateUserAvatar from "hooks/user/useUpdateUserAvatar";
import performSchemaValidation from "utils/performSchemaValidation";
import useUpdateUserProfile from "hooks/user/useUpdateUserProfile";
import { UpdateUserProfileData } from "hooks/user/useUpdateUserProfile/types";

import schema from "./schema";
import { AvatarInput, Container, Content } from "./styles";

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const [t] = useTranslation();
  const [user, setUser] = useLocalStorage<User>(
    USER_STORAGE_KEY,
    {} as User,
  );

  const [updateUserAvatar, isUpdateUserAvatarLoading] = useUpdateUserAvatar();
  const [updateUserProfile, isUpdateUserProfileLoading] = useUpdateUserProfile();

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

    updateUserAvatar(formData)
      .then((updatedUser) => {
        if (!updatedUser) {
          return;
        }

        setUser(updatedUser);
      })
      .catch(noop);
  }, [
    setUser,
    updateUserAvatar,
  ]);

  const handleUpdateUserProfile = useCallback((data: UpdateUserProfileData) => {
    const {
      name,
      email,
      password,
      old_password,
      password_confirmation,
    } = data;

    updateUserProfile({
      name,
      email,
      ...(password ? {
        password,
        old_password,
        password_confirmation,
      } : {}),

    }).then(updatedUser => {
      if (!updatedUser) {
        return;
      }

      setUser(updatedUser);

      history.push(DASHBOARD_PAGE_PATH);
    })
      .catch(noop);
  }, [
    setUser,
    history,
    updateUserProfile,
  ]);

  const handleSubmit = useCallback(
    (data) => {
      performSchemaValidation({
        formRef,
        schema,
        data,
      })
        .then(() => handleUpdateUserProfile(data))
        .catch(noop);
    },
    [handleUpdateUserProfile],
  );

  const isMutationsLoading = isUpdateUserAvatarLoading || isUpdateUserProfileLoading;

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
            <Avatar name={user.name} avatarUrl={user.avatar_url} />

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

          <ShowPasswordInput
            name="old_password"
            type="password"
            icon={FiLock}
            placeholder={t("update_profile_form.current_password")}
          />

          <ShowPasswordInput
            name="password"
            type="password"
            icon={FiLock}
            placeholder={t("auth_form.password")}
            autoComplete="new-password"
          />

          <ShowPasswordInput
            name="password_confirmation"
            type="password"
            icon={FiLock}
            placeholder={t("update_profile_form.password_confirmation")}
            autoComplete="new-password"
          />

          <Button
            type="submit"
            loading={isMutationsLoading}
            disabled={isMutationsLoading}
          >
            {t("buttons.confirm_changes")}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
