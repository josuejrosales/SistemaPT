// import { useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import useHttp from "./hooks/useHttp";
// import Templater from "./pages/template/app-template";
// import Home from "./pages/Home";

// function App() {

//     const user = useHttp({ url: '/getUser' });

//     useEffect(() => {
//         user.startHttp();
//     }, []);

//     if (user.response) {
//         return (
//             <Templater title={user.response.name} NavLinkUser={[]}>
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/reportes" element={<>Reportes</>} />
//                 </Routes>
//                 <Toaster position="top-right" />
//             </Templater>
//         );
//     }
// }

// export default App;



























import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Button } from '@mui/material';
import { Home, Dashboard, Settings } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

// Componentes de las páginas
const HomePage = () => <Typography variant="h4">Home Page</Typography>;
const DashboardPage = () => <Typography variant="h4">Dashboard Page</Typography>;
const SettingsPage = () => <Typography variant="h4">Settings Page</Typography>;

const App = () => {
    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                News
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </Box>

                {/* Drawer (menú lateral) */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}>
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <ListItem button component={Link} to="/">
                                <ListItemIcon><Home /></ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                            <ListItem button component={Link} to="/dashboard">
                                <ListItemIcon><Dashboard /></ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                            <ListItem button component={Link} to="/settings">
                                <ListItemIcon><Settings /></ListItemIcon>
                                <ListItemText primary="Settings" />
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
};

export default App;
