import React from 'react';
import { addDecorator } from '@storybook/react';
import StylesProvider from '../src/contexts/styles';

addDecorator(storyFn => (
  <StylesProvider>
    {storyFn()}
  </StylesProvider>
));
