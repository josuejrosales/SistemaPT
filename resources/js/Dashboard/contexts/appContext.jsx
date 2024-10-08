import { useTheme } from "@emotion/react";
import { Box, Container, CssBaseline, useMediaQuery } from "@mui/material";
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

function AppContextProvider({ children }) {

  const navigate = useNavigate();
  const sizeSM = useMediaQuery(useTheme().breakpoints.up("sm"));

  return (
    <AppContext.Provider value={{ navigate, sizeSM }}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {children}
      </Box>
    </AppContext.Provider>
  );
}

export { AppContext };
export default AppContextProvider;
