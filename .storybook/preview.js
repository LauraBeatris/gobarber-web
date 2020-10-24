import React from 'react';
import { addDecorator } from '@storybook/react';

import StylesProvider from '../src/contexts/styles';
import ModalContainer from '../src/contexts/modal/ModalContainer';

addDecorator(storyFn => (
  <StylesProvider>
    <ModalContainer>
    {storyFn()}
    </ModalContainer>
  </StylesProvider>
));
