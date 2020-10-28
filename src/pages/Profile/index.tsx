import React, {
  ChangeEvent,
  useCallback,
  useState,
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
import { ValidationError } from "yup";

import Input from "components/Input";
import Button from "components/Button";
import api from "settings/api";
import { useToastsDispatch } from "contexts/toasts/ToastsContext";
import { USER_STORAGE_KEY } from "constants/localStorage";
import { User } from "shared/types/apiSchema";
import ShowPasswordInput from "components/Input/ShowPasswordInput";
import getValidationErrors from "utils/getValidationErrors";
import { DASHBOARD_PAGE_PATH } from "constants/routesPaths";
import Avatar from "components/Avatar";

import { AvatarInput, Container, Content } from "./styles";
import schema from "./schema";

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [user, setUser] = useLocalStorage<User>(
    USER_STORAGE_KEY,
    {} as User,
  );

  const history = useHistory();

  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);

  const { addToast } = useToastsDispatch();

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
    async (data): Promise<void> => {
      setLoading(true);

      try {
        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          password,
          old_password,
          password_confirmation,
        } = data;

        const { data: updatedUser } = await api.put<User>("/profile", {
          name,
          email,
          ...(password ? {
            password,
            old_password,
            password_confirmation,
          } : {}),
        });

        setUser(updatedUser);

        addToast({
          type: "success",
          title: "Profile successfully updated",
        });

        history.push(DASHBOARD_PAGE_PATH);
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: error.response?.data.message,
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, history, setUser],
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
            autoComplete="current-password"
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
