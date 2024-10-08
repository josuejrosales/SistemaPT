import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContextProvider from './contexts/appContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Reportes from './pages/Reportes';
import { Toaster } from 'react-hot-toast';
import Productos from './pages/page-productos/Productos';
import Clientes from './pages/page-clientes/Clientes';
import Pedidos from './pages/page-pedidos/Pedidos';


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
            <BrowserRouter>
                <AppContextProvider>
                    <Routes>
                        <Route path="/dashboard/*" element={<Dashboard />}>
                            <Route path="home" element={"home"} />
                            <Route path="reportes" element={<Reportes />} />
                            <Route path="productos" element={<Productos />} />
                            <Route path="clientes" element={<Clientes />} />
                            <Route path="pedidos" element={<Pedidos />} />
                        </Route>
                    </Routes>
                </AppContextProvider>
            </BrowserRouter>
            <Toaster position="top-right" reverseOrder={false}
            />
        </ThemeProvider>
    );

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);