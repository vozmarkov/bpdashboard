import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  useMatch,
  useResolvedPath,
  Link,
} from 'third-party';
import type { LinkProps } from 'react-router-dom';

interface IProps extends LinkProps {
  label: string;
  disabled: boolean;
  icon: any;
}

export const NavigationLink = (props: IProps) => {
  const { label, disabled, icon, to } = props;
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const text = (
    <ListItem button key={label} disabled={disabled}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );

  if (disabled) {
    return text;
  }
  return (
    <Link
      style={{ textDecoration: match ? 'underline' : 'none' }}
      to={to}
      {...props}
    >
      {text}
    </Link>
  );
};
