import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { BASE_ADMIN } from "../config/app";
import { styled } from '@mui/material/styles';

const StyleNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: "none",
    color: theme.palette.text.primary,
    '&.active': {
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        '& .MuiListItemIcon-root': {
            color: 'inherit',
        },
    },
}))

function NavList({ items, pressItem }) {
    return (
        <List component={"div"}>
            {items.map((element, i) => (
                <StyleNavLink key={i} to={BASE_ADMIN + element.segment} onClick={pressItem}>
                    <ListItemButton>
                        <ListItemIcon sx={{
                            minWidth: 40
                        }}>
                            {element.icon}
                        </ListItemIcon>
                        <ListItemText primary={element.title} />
                    </ListItemButton>
                </StyleNavLink>
            ))}
        </List>
    );
}

NavList.propTypes = {
    items: PropTypes.array.isRequired
}

export default NavList;