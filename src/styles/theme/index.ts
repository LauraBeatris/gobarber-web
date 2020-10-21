import colors from "./colors";

const theme = {
  colors,
  zIndexes: {
    header: 100,
    toasts: 110,
  },
  lengths: {
    header: 200,
    contentMaxWidth: 1120,
  },
};

export type ThemeTypes = typeof theme;

export default theme;
