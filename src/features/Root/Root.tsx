import React from 'react';
import { HashRouter } from 'third-party';
import { routes } from 'routes';

export const RootContainer = () => {
  return <HashRouter>{routes} </HashRouter>;
};
