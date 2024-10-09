import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, Button, IconButton, Toolbar } from "@mui/material";
import { BASE_ADMIN, NAVIGATION } from "../config/app";
import { AppContext } from "../contexts/appContext";
import IconMenu from "../components/IconMenu";
import StoreIcon from '@mui/icons-material/Store';

function Dashboard() {

    const { key } = useLocation();
    const { navigate } = useContext(AppContext);

    useEffect(() => {
        if (key === 'default') navigate(BASE_ADMIN + NAVIGATION[0].segment)
    }, [key]);

    return (
        <React.Fragment>
            <NavBar title={"PANEL DE ADMINISTRACION"} >
                <IconMenu>
                    <Button component={"a"} href="/login-close" padding={1}>
                        Cerrar Session
                    </Button>
                </IconMenu>
                <IconButton color="inherit" component={"a"} href="/">
                    <StoreIcon fontSize="medium" />
                </IconButton>
            </NavBar>
            <Box sx={{ p: 2, width: "100%", overflow: 'hidden' }}>
                <Toolbar />
                <Outlet />
            </Box>
        </React.Fragment>
    );
}

export default Dashboard;