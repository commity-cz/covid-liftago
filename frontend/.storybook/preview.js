import { ThemeProvider } from "@material-ui/styles";
import { addDecorator } from '@storybook/react';
import {theme} from "../src/theme"
import React from 'react';

const themeProviderDecorator = storyFn => React.createElement(ThemeProvider, {
  theme: theme
}, storyFn());

addDecorator(themeProviderDecorator);

