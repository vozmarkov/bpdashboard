import {
  getBasePath,
  getDownloadPath,
  getSettingsPath,
  getUploadPath,
} from 'constants/urls';
import * as React from 'react';
import {
  styled,
  useTheme,
  Box,
  Drawer,
  CssBaseline,
  MuiAppBar,
  MuiAppBarProps,
  Toolbar,
  List,
  Divider,
  IconButton,
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListItem,
  ListItemIcon,
  ListItemText,
  AccountCircleIcon,
  SettingsIcon,
  AssessmentIcon,
  UploadFileIcon,
  GroupWorkIcon,
} from 'third-party';
import type { LinkProps } from 'react-router-dom';
import { NavigationLink } from 'components';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const SideMenuLeft = ({ children }: any) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <NavigationLink
            label="Total Overview"
            disabled={false}
            icon={<GroupWorkIcon />}
            to={getBasePath()}
          />
          <Divider />
          {['Test'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            {
              label: 'Upload',
              id: 'upload',
              icon: <UploadFileIcon />,
              disabled: false,
              url: getUploadPath(),
            },
            {
              label: 'Download CVS',
              id: 'downloadcvs',
              icon: <AssessmentIcon />,
              disabled: true,
              url: getDownloadPath(),
            },
            {
              label: 'Settings',
              id: 'setting',
              icon: <SettingsIcon />,
              disabled: true,
              url: getSettingsPath(),
            },
          ].map((i) => (
            <NavigationLink
              key={i.label}
              label={i.label}
              disabled={i.disabled}
              icon={i.icon}
              to={i.url}
            />
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};
