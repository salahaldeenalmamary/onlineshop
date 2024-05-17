import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import {
    ChevronLeft,
    ChevronRight,
    AccountCircle
}
    from "@mui/icons-material";
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import {
    Box,
    Drawer,
    CssBaseline,
    Toolbar,
    Typography,
    Divider,
    IconButton,
    MenuItem,
    Menu,
}
    from "@mui/material";
import { useNavigate } from "react-router-dom";

import MenuList from '@components/MenuList/MenuList';
import { useAuth } from '@auth/Authorize';

const drawerWidth = 250;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(2),
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
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

function PersistentDrawerLeft({ title, icons, menu, children }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const auth = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = React.useState("client");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const switchRoutes = () => {
        const Url = document.URL;
        const route = Url.toLowerCase().indexOf(auth.getRole().toLowerCase()) == -1;
        const switchRoute = route ? "admin" : "client";
        navigate(`dashboard/${switchRoute}`);
    };

    React.useEffect(() => {
        const Url = document.URL;
        const route = Url.toLowerCase().indexOf(auth.getRole().toLowerCase()) == -1;
        const switchRole = route ? "admin" : "client";
        setRole(switchRole);
    }, []);

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
                    <Typography color="#fff" variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {auth.getRole() == "Admin" ? (
                                <MenuItem onClick={switchRoutes}>Switch to {role}</MenuItem>
                            ) : null}
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={() => {
                                auth.logout();
                            }}>Logout</MenuItem>
                        </Menu>
                    </div>
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
                        {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <MenuList icons={icons} menu={menu} drawerOpen={open} setDrawerState={setOpen} />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}

export default React.memo(PersistentDrawerLeft);