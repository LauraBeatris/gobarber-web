import colors from "./colors";

const theme = {
  colors,
  zIndexes: {
    toasts: 1000,
  },
  lengths: {
    contentMaxWidth: 1120,
  },
};

export type ThemeTypes = typeof theme;

export default theme;
