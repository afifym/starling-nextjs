import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import '@testing-library/jest-dom';
import React from 'react';
import theme from '../styles/theme';

interface IProps {
  children: JSX.Element;
}

const Renderer: React.FC<IProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui, options) =>
  render(ui, {
    wrapper: Renderer,
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };
