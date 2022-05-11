import React from 'react';
import { Route, Routes } from 'third-party';
import { MainContainer, Overview, Upload } from 'features';
import { getBasePath, getUploadPath } from 'constants/urls';

export const routes = (
  <MainContainer>
    <Routes>
      <Route path={getUploadPath()} element={<Upload />} />
      <Route path={getBasePath()} element={<Overview />} />
    </Routes>
  </MainContainer>
);
