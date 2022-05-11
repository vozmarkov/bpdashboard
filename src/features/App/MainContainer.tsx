import { SideMenuLeft } from '../SideMenuLeft/SideMenuLeft';
import React from 'react';

export const MainContainer = ({ children }: any) => {
  return <SideMenuLeft>{children}</SideMenuLeft>;
};
