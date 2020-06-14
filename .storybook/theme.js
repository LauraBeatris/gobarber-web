import { create } from '@storybook/theming/create';
import logo from '../docs/logo.svg';

export default create({
  base: 'dark',
  appBg: "#312e38",
  colorSecondary: "#ff9000",
  textInverseColor: "#ff9000",
  brandTitle: 'Go Barber',
  brandImage: logo,
  fontBase: "'Roboto Slab', arial, sans-serif",
  fontCode: 'monospace',
});
