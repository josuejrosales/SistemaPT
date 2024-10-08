import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";

function TitleSection({ title, Icon = null, children }) {
    return (
        <ListItem disablePadding sx={{ display: "flex", gap: 1 }}>
            <ListItemIcon sx={{ minWidth: 'auto' }}>
                {Icon && <Icon />}
            </ListItemIcon>
            <ListItemText>
                <Typography variant="h6">
                    {title}
                </Typography>
            </ListItemText>
            {
                children
            }
        </ListItem>
    );
}

export default TitleSection;