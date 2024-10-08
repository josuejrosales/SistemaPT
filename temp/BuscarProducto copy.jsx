
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useHttp from '../resources/js/Dashboard/hooks/useHttp';
import LOAD from '../resources/js/Dashboard/global/load';

function BuscarProducto() {

    const productos = useHttp({ url: "/productos" });

    useEffect(() => {
        productos.startHttp()
    }, []);

    return (
        <>
            <Autocomplete
                loading={productos.loading == LOAD.complete}
                disablePortal
                options={productos.response ?? []}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option.Nombre}

                renderInput={(params) => <TextField {...params} label="Nombre del producto" />}
            />
        </>
    );
}

export default BuscarProducto;