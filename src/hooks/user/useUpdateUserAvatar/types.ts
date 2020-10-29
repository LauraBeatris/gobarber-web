import { User } from "shared/types/apiSchema";
import { MutationHookPayload } from "shared/types/mutations";

export type UseUpdateUserAvatarPayload = MutationHookPayload<User, FormData>;
