import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Box, Link, MenuItem, Toolbar } from "@mui/material";
import { BASE_ADMIN, NAVIGATION } from "../config/app";
import { AppContext } from "../contexts/appContext";
import IconMenu from "../components/IconMenu";

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
                    <Link component={MenuItem} href="/login-close">
                        Cerrar Session
                    </Link>
                </IconMenu>
            </NavBar>
            <Box sx={{ p: 2, width: "100%", overflow: 'hidden' }}>
                <Toolbar />
                <Outlet />
            </Box>
        </React.Fragment>
    );
}

export default Dashboard;