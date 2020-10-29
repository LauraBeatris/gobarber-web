import { AxiosError } from "axios";
import { useMemo } from "react";
import { useMutation } from "react-query";

import api from "settings/api";
import { User } from "shared/types/apiSchema";

import { UpdateUserProfileData, UseUpdateUserProfilePayload } from "./types";

const updateUserProfileMutation = (data: UpdateUserProfileData): Promise<User> => {
  const {
    name,
    email,
    password,
    old_password,
    password_confirmation,
  } = data;

  return api.put<User, { data: User }>("/profile", {
    name,
    email,
    ...(password ? {
      password,
      old_password,
      password_confirmation,
    } : {}),
  }).then(response => response.data);
};

/**
 * Returns the mutation to update user profile
 */
const useUpdateUserProfile = (): UseUpdateUserProfilePayload => {
  const [
    mutate, { isLoading },
  ] = useMutation<User, AxiosError, UpdateUserProfileData>(updateUserProfileMutation);

  const payload = useMemo<UseUpdateUserProfilePayload>(() => [
    mutate,
    isLoading,
  ], [
    mutate,
    isLoading,
  ]);

  return payload;
};

export default useUpdateUserProfile;
