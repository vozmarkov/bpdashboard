import { Button } from '@mui/material';
import React, { useState } from 'react';

export const Overview = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      Overview: {count}{' '}
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        click
      </Button>
    </div>
  );
};
