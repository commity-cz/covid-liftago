import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders login form', () => {
  const { getByAltText } = render(<App />);
  const loginButton = getByAltText(/Logo Dobrovoz/i);
  expect(loginButton).toBeInTheDocument();
});
