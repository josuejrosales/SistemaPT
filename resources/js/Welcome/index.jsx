
import { Box, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import AppContextProvider from './contexts/appContext';

const theme = createTheme({
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppContextProvider>
                <Box p={2} flexGrow={1} bgcolor={'#d0d5d7'}>
                    <Home />
                </Box>
            </AppContextProvider>
            <Toaster position="top-right" reverseOrder={false} />
        </ThemeProvider>
    );
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />);