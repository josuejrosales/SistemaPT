import React, { useEffect, useState } from "react";
import { FormComponent, InputComponent, SelectComponent } from "../components/FormComponent";
import useHttp from "../hooks/useHttp";
import LOAD from "../global/load";
import { Box } from "@mui/material";

function FormPedido({ form = null, data, panel = {}, state = {}, dispatch = () => { }, disabled = false, children }) {

    const clientes = useHttp({ url: "/clientes" });
    const metodo_pagos = useHttp({ url: "/metodo_pago" });

    useEffect(() => {
        if (data) {
            dispatch({
                IdCliente: data?.IdCliente ?? "",
                IdMetodoPago: data?.IdMetodoPago ?? "",
            })
        }
    }, [data]);

    useEffect(() => {
        clientes.startHttp();
        metodo_pagos.startHttp();
    }, []);

    return (

        <FormComponent _ref={form}>

            <InputComponent
                maxWidth="100px"
                name="ivg"
                label={"IGV"}
                value={"18%"}
                disabled={true} />

            <SelectComponent
                minWidth="250px"
                loading={clientes.loading == LOAD.progress}
                name="IdCliente"
                label={"Cliente"}
                items={clientes.response ?? []}
                configItems={{ id: "id", value: "Nombre" }}
                defaultValue={state.IdCliente ?? ""}
                onChange={v => dispatch({ IdCliente: v })}
                disabled={disabled} />

            <SelectComponent
                minWidth="100px"
                label={"Metodo de pago"}
                name="IdMetodoPago"
                items={metodo_pagos.response ?? []}
                configItems={{ id: "id", value: "Nombre" }}
                defaultValue={state.IdMetodoPago ?? ""}
                onChange={v => dispatch({ IdMetodoPago: v })}
                loading={metodo_pagos.loading == LOAD.progress}
                disabled={disabled} />

            <Box display={'flex'} flexDirection={'column'} width={'100%'}>

                <InputComponent
                    bgcolor={'bg-black'}
                    _variant="filled"
                    name="Impuesto"
                    label={"Impuesto"}
                    value={Number(panel.Impuesto).toFixed(2) ?? ""}
                    disabled={true} />

                <InputComponent
                    bgcolor={'bg-black'}
                    _variant="filled"
                    name="Descuento"
                    label={"Sub Total"}
                    value={Number(panel.SubTotal).toFixed(2) ?? ""}
                    disabled={true} />

                <InputComponent
                    bgcolor={'bg-black'}
                    name="Total"
                    label={"Total"}
                    value={Number(panel.Total).toFixed(2) ?? ""}
                    _variant="filled"
                    disabled={true} />
            </Box>

            {children}
        </FormComponent>
    )
}

export default FormPedido;