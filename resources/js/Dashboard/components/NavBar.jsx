import PropTypes from 'prop-types';
import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/appContext";
import NavList from "./NavList";
import { NAVIGATION } from "../config/app";

function NavBar({ title, children }) {
    const { sizeSM } = useContext(AppContext);
    const [openDrawen, setOpenDrawen] = useState(false);
    return (
        <React.Fragment>
            <AppBar variant="elevation" sx={{ boxShadow: "none", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar disableGutters sx={{ px: { sm: 2 } }}>
                    {
                        !sizeSM && <IconButton color='inherit' onClick={() => setOpenDrawen(!openDrawen)}>
                            {openDrawen ? <MenuOpenIcon /> : <MenuIcon />}
                        </IconButton>
                    }
                    <Typography component={"h2"}>{title}</Typography>
                    {children}
                </Toolbar>
            </AppBar>

            <Drawer open={openDrawen} variant={sizeSM ? "permanent" : "temporary"} onClose={() => setOpenDrawen(false)}
                sx={{
                    width: 200,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' },
                }}>
                <Toolbar />
                <NavList items={NAVIGATION} pressItem={() => setOpenDrawen(false)} />
            </Drawer>
        </React.Fragment>
    );
}

NavBar.propTypes = {
    title: PropTypes.string.isRequired
};

export default NavBar;