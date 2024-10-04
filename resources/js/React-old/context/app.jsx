import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

const AppProviderContext = ({ page, children }) => {

    const [change, setChange] = useState(false);
    const [sectionId, setSectionId] = useState(0);

    const navigate = useNavigate();

    return (
        <AppContext.Provider
            value={{ navigate, change, setChange, sectionId, setSectionId, page }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext };
export default AppProviderContext;
