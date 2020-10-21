import { PASSWORD_MIN_LENGTH } from "constants/authentication";
import i18n from "translations/i18n";

/**
 * Applies validation to the old password value
 * when updating a profile
 */
const oldPasswordTest = {
  name: "updatePasswordIsValid",
  exclusive: false,
  test: (value: string): boolean => {
    if (!value) {
      return true;
    }

    return value.length > PASSWORD_MIN_LENGTH;
  },
  message: i18n.t("update_profile_form.current_password_invalid_length", {
    min: PASSWORD_MIN_LENGTH,
  }),
};

export default oldPasswordTest;
