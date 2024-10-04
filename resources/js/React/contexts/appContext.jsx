import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const navigate = useNavigate();

  const [userSelected, setUserSelected] = useState(null);

  const [search, setSearch] = useState({
    value: "",
    placeholder: "",
    start: false,
    key: "",
  });

  return (
    <AppContext.Provider
      value={{ search, setSearch, navigate, userSelected, setUserSelected }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
export default AppContextProvider;
