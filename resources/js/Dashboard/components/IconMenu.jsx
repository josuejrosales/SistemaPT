
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import { useState } from 'react';

export default function IconMenu({ children }) {

    const [menuOptions, setMenuOptions] = useState(null);

    return (
        <Box sx={{ marginLeft: "auto" }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={event => setMenuOptions(event.currentTarget)}
                color="inherit">

                <AccountCircle />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={menuOptions}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(menuOptions)}
                onClose={() => setMenuOptions(null)}>
                {children}
            </Menu>
        </Box >
    );
}
