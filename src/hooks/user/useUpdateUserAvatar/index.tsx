import { AxiosError } from "axios";
import { useMemo } from "react";
import { useMutation } from "react-query";

import api from "settings/api";
import { User } from "shared/types/apiSchema";

import { UseUpdateUserAvatarPayload } from "./types";

const updateUserAvatarMutation = (formData: FormData): Promise<User> => (
  api.patch<User, {data: User}>("/users/avatar", formData)
    .then(response => response.data)
);

/**
 * Returns the mutation to set user avatar
 */
const useUpdateUserAvatar = (): UseUpdateUserAvatarPayload => {
  const [mutate, { isLoading }] = useMutation<User, AxiosError, FormData>(updateUserAvatarMutation);

  const payload = useMemo<UseUpdateUserAvatarPayload>(() => [
    mutate,
    isLoading,
  ], [
    mutate,
    isLoading,
  ]);

  return payload;
};

export default useUpdateUserAvatar;
