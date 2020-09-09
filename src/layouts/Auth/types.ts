import { AuthAnimationContainerProps } from "styles/components/AuthAnimationContainer";

export interface AuthLayoutProps extends AuthAnimationContainerProps {
  title: string;
  description?: string;
  backgroundImage: string;
  backgroundPosition?: "left" | "right";
}
