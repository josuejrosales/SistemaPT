import React from "react";
import { InputComponent, StyleInput } from "../components/FormComponent";

function FormCliente({ state, dispatch, error, disabled = false, children }) {
    return (
        <React.Fragment>
            <InputComponent error={error?.Nombre}>
                <StyleInput
                    name="Nombre"
                    label='Nombre'
                    value={state.Nombre ?? ""}
                    onChange={({ target }) => dispatch({ Nombre: target.value })}
                    disabled={disabled}
                />
            </InputComponent>
            <InputComponent error={error?.Email}>
                <StyleInput
                    name="Email"
                    label='Correo'
                    value={state?.Email ?? ""}
                    onChange={({ target }) => dispatch({ Email: target.value })}
                    disabled={disabled}
                />
            </InputComponent>
            <InputComponent error={error?.Telefono}>
                <StyleInput
                    name="Telefono"
                    label='Telefono'
                    value={state?.Telefono ?? ""}
                    onChange={({ target }) => dispatch({ Telefono: target.value })}
                    disabled={disabled}
                />
            </InputComponent>
            <InputComponent error={error?.Direccion}>
                <StyleInput
                    name="Direccion"
                    label='Direccion'
                    value={state?.Direccion ?? ""}
                    onChange={({ target }) => dispatch({ Direccion: target.value })}
                    disabled={disabled}
                />
            </InputComponent>
            {children}
        </React.Fragment>
    );

}

export default FormCliente;