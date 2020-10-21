import { InputHTMLAttributes } from "react";
import { IconBaseProps } from "react-icons";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}
