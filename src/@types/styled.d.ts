/* eslint-disable @typescript-eslint/no-empty-interface */
import { ThemeTypes } from "styles/theme";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeTypes {}
}
