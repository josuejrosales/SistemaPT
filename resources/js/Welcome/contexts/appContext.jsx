
import { Box, Divider, IconButton, Typography } from "@mui/material";
import React, { createContext, useState } from "react";
import NavLeft from "../pages/NavLeft";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const AppContext = createContext();

function AppContextProvider({ children }) {

  const [selected, setSelected] = useState(null);

  return (
    <AppContext.Provider value={{ selected }}>
      <Box display={'flex'} width={'100%'} bgcolor={'#282828'}>
        <Typography variant="h4" p={3} color={"white"} fontWeight={'bold'}>Online Store</Typography>
        <IconButton component={"a"} sx={{ color: "white", marginLeft: "auto", right: 20 }} href="/dashboard">
          <ManageAccountsIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box display={'flex'} spacing={2}>
        <NavLeft selected={selected} onSelect={setSelected} />
        <Divider orientation="horizontal" />
        {children}
      </Box>
    </AppContext.Provider>
  );
}

export { AppContext };
export default AppContextProvider;
