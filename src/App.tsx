import React from 'react';
import { RootContainer } from 'features/Root/Root';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(<RootContainer />);
