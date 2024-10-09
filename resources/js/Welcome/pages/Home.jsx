import React, { useContext, useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { AppContext } from '../contexts/appContext';
import CardComponent from '../components/CardComponent';
import useHttp from '../../Dashboard/hooks/useHttp';
import Loader from '../components/Loader';
import LOAD from '../../Dashboard/global/load';
import { BASE_IMG, IMG_DEFAULT } from '../../Dashboard/config/app';

export default function Home() {

    const produtos = useHttp({});
    const app = useContext(AppContext);

    useEffect(() => {
        app?.selected && produtos.startHttp(
            { url: `/categoria/${app.selected.IdCategoria}/sub-categoria/${app.selected.id}/show` }
        );
    }, [app]);

    if (!(app?.selected ?? false)) return <Typography>Selecciona una categoria...</Typography>;

    if (produtos.loading != LOAD.complete) return <Loader />

    return (
        <Box
            display={'grid'}
            gap={2}
            gridTemplateColumns={"repeat(auto-fill, minmax(350px, 1fr))"}>

            {(produtos.response ?? []).length <= 0 ? <Typography>No hay registros...</Typography>
                : produtos.response.map((item, i) =>
                    <CardComponent key={i} title={item.Nombre ?? ""} img={item.Photo ? `${BASE_IMG}/${item.Photo}` : IMG_DEFAULT}>
                        <Typography component={'p'} sx={{ my: 1, color: "gray" }}>{item.Descripcion ?? "Sin descripcion"}</Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography>Stock : {item.Stock ?? 0}</Typography>
                            <Typography>Precio : S/{item.Precio ?? 0}</Typography>
                        </Box>
                    </CardComponent>
                )
            }
        </Box>
    );
}
