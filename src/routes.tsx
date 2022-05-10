import React from 'react';
import { Route, Routes } from './third-party';
import { AppContainer, MainContainer, Overview } from './features/index';

export const routes = (
  <AppContainer>
    <MainContainer>
      <Routes>
        <Route path="/" element={<Overview />} />
      </Routes>
    </MainContainer>
  </AppContainer>
);
