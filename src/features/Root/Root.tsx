import React from 'react';
import { HashRouter, Box, CssBaseline, ThemeProvider } from 'third-party';
import { routes } from 'routes';
import theme from 'theme';

export const RootContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        {' '}
        <HashRouter>{routes} </HashRouter>
      </Box>
    </ThemeProvider>
  );
};
