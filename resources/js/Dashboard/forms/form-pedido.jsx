import React, { useEffect, useReducer, useState } from "react";
import { InputComponent, SelectComponent, StyleInput } from "../components/FormComponent";
import useHttp from "../hooks/useHttp";
import LOAD from "../global/load";
import { Box } from "@mui/material";
import { Pedido } from "../class/Pedido";

const funReducer = (state, action) => ({ ...state, ...action });

function FormPedido({ state, panel = {}, error = {}, disabled = false }) {

    const clientes = useHttp({ url: "/clientes" });
    const metodo_pagos = useHttp({ url: "/metodo_pago" });

    const [formData, setFormData] = useReducer(funReducer, {});

    useEffect(() => {
        state?.response && setFormData(Pedido.filterParams(state.response, ["IdCliente", "IdMetodoPago"]));
    }, [state]);

    useEffect(() => {
        clientes.startHttp();
        metodo_pagos.startHttp();
    }, []);

    return (
        <Box display={'flex'} gap={2} flexWrap={'wrap'}>
            <InputComponent props={{ maxWidth: "70px" }}>
                <StyleInput
                    disabled={true}
                    label="IGV"
                    value={"18%"} />
            </InputComponent>
            <InputComponent
                loading={clientes.loading == LOAD.progress}
                error={error.IdCliente}
                props={{ right: 40, }}>

                <SelectComponent
                    id="Cliente"
                    label="Cliente"
                    options={clientes.response ?? []}
                    configOptions={{ id: "id", value: "Nombre" }}

                    props={{
                        disabled,
                        name: "IdCliente",
                        label: "Cliente",
                        value: formData.IdCliente ?? "",
                        onChange: ({ target }) => setFormData({ IdCliente: target.value })
                    }}
                />
            </InputComponent>
            <InputComponent
                loading={clientes.loading == LOAD.progress}
                error={error.IdMetodoPago}
                props={{ right: 40, }}>

                <SelectComponent
                    id="MetodoPago"
                    label="Metodo de Pago"
                    options={metodo_pagos.response ?? []}
                    configOptions={{ id: "id", value: "Nombre" }}

                    props={{
                        disabled,
                        name: "IdMetodoPago",
                        label: "Metodo de Pago",
                        value: formData.IdMetodoPago ?? "",
                        onChange: ({ target }) => setFormData({ IdMetodoPago: target.value })
                    }}
                />
            </InputComponent>

            <InputComponent props={{ width: "100%" }}>
                <StyleInput
                    className="bg-black"
                    disabled={true}
                    label="Impuesto"
                    variant="filled"
                    value={Number(panel.Impuesto).toFixed(2) ?? ""} />
                <StyleInput
                    className="bg-black"
                    disabled={true}
                    label="Sub Total"
                    variant="filled"
                    value={Number(panel.SubTotal).toFixed(2) ?? ""} />
                <StyleInput
                    className="bg-black"
                    disabled={true}
                    label="Total"
                    variant="filled"
                    value={Number(panel.Total).toFixed(2) ?? ""} />
            </InputComponent>
        </Box>
    )
}

export default FormPedido;