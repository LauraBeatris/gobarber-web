import React from 'react';
import { addDecorator } from '@storybook/react';
import Styles from '../src/contexts/styles';

addDecorator(storyFn => <Styles>{storyFn()}</Styles>);
