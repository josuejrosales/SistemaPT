import React from "react";
import { InputComponent, StyleInput } from "../components/FormComponent";
import { Producto } from "../class/Producto";

function FormProducto({ state, dispatch, error, children, disabled = false }) {
    return (
        <React.Fragment>
            {
                Producto.getFillableTable().map((element, i) => {
                    return !Boolean(element.ignore) && (
                        <InputComponent key={i} error={error?.[element.name]}>
                            <StyleInput
                                disabled={disabled}
                                name={element.name}
                                label={element.label}
                                value={state[element.name] ?? ""}
                                onChange={({ target }) => dispatch({ [element.name]: target.value })}
                            />
                        </InputComponent>
                    );
                })
            }
            {children}
        </React.Fragment>
    );

}

export default FormProducto;