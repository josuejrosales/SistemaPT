import { createTheme, Grid2, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContextProvider from './contexts/appContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';
import Productos from './pages/page-productos/Productos';
import Clientes from './pages/page-clientes/Clientes';
import Pedidos from './pages/page-pedidos/Pedidos';
import Home from './pages/page-home/Home';
import TipoPago from './pages/page-mantenimiento/TipoPago';
import Categoria from './pages/page-mantenimiento/Categoria';
import SubCategoria from './pages/page-mantenimiento/SubCategoria';

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
                            <Route path="home" element={<Home />} />
                            <Route path="productos" element={<Productos />} />
                            <Route path="clientes" element={<Clientes />} />
                            <Route path="pedidos" element={<Pedidos />} />
                            <Route path="mantenimiento" element={
                                <Grid2 container spacing={5}>
                                    <TipoPago />
                                    <Categoria />
                                    <SubCategoria />
                                </Grid2>
                            } />
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