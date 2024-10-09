import React, { useEffect, useState } from 'react';
import CardIcon from '../../components/CardIcon';
import PersonIcon from '@mui/icons-material/Person';
import { Grid2 } from '@mui/material';
import useHttp from '../../hooks/useHttp';
import LOAD from '../../global/load';
import MaskCard from '../../components/MaskCard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


function InfoGeneral() {

    const general = useHttp({ url: "/general" });

    useEffect(() => {
        general.startHttp();
    }, []);

    if (general.loading != LOAD.complete) return <MaskCard count={4} height={80} />

    return (
        <Grid2 container spacing={2}>
            <Grid2 flexGrow={1}>
                <CardIcon bg='#1976d2' title={"Clientes"} Icon={() => <PersonIcon fontSize='large' />}>
                    {general.response?.cliente}
                </CardIcon>
            </Grid2>
            <Grid2 flexGrow={1}>
                <CardIcon bg='#076a55' title={"Productos"} Icon={() => <ShoppingCartIcon fontSize='large' />}>
                    {general.response?.producto}
                </CardIcon>
            </Grid2>
            <Grid2 flexGrow={1}>
                <CardIcon bg='#b33220' title={"Pedidos"} Icon={() => <LocalShippingIcon fontSize='large' />}>
                    {general.response?.pedido}
                </CardIcon>
            </Grid2>
            <Grid2 flexGrow={1}>
                <CardIcon bg='#607d8b' title={"Otros"} Icon={() => <PersonIcon fontSize='large' />}>
                    0
                </CardIcon>
            </Grid2>
        </Grid2>
    );
}

export default InfoGeneral;