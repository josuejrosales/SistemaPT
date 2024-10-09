
import { Box, Collapse, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import useHttp from "../../Dashboard/hooks/useHttp";
import LOAD from "../../Dashboard/global/load";
import MaskCard from "../../Dashboard/components/MaskCard";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';

function NavLeft({ selected, onSelect }) {

    const categorias = useHttp({ url: "/categoria-show" });
    const [openCollapse, setOpenCollapse] = useState({});

    useEffect(() => {
        categorias.startHttp();
    }, []);

    return (
        <Box minWidth={250} height={'100vh'} padding={1} borderRight={"1px solid #cecece"}>
            {
                categorias.loading != LOAD.complete ? <MaskCard height={55} count={5} direction={'column'} /> :
                    <List>
                        {categorias.response.map((item) => (
                            <div key={item.id}>
                                <ListItem onClick={() => setOpenCollapse((prev) => ({ ...prev, [item.Nombre]: !prev[item.Nombre] }))}>
                                    <ListItemText primary={item.Nombre ?? "None"} />
                                    {openCollapse[item.Nombre] ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>

                                <Collapse in={openCollapse[item.Nombre]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.get_sub_categoria.map((subcategoria) => (

                                            <ListItem
                                                onClick={() => onSelect(subcategoria)}
                                                key={subcategoria.id}
                                                sx={{ pl: 4, color: (selected?.id ?? 0) == subcategoria.id ? "#2196f3" : "inherit" }}>

                                                <ListItemText primary={subcategoria.Nombre} />
                                                {
                                                    (selected?.id ?? 0) == subcategoria.id &&
                                                    <ListItemIcon sx={{ color: "#2196f3" }}>
                                                        <KeyboardTabIcon />
                                                    </ListItemIcon>
                                                }
                                            </ListItem>

                                        ))}
                                    </List>
                                </Collapse>
                            </div>
                        ))}
                    </List>
            }
        </Box >
    );
}

export default NavLeft;