import React, { useEffect } from "react";
import { FormComponent, InputComponent, SelectComponent, StyleInput } from "../components/FormComponent";
import useHttp from "../hooks/useHttp";
import LOAD from "../global/load";
import { Description } from "@mui/icons-material";
import { Producto } from "../class/Producto";
import FilterProductos from "../pages/page-productos/FilterProductos";

function FormProducto({ state, dispatch, error, children, disabled = false }) {

    const categorias = useHttp({ url: "/categorias" });
    const subcategorias = useHttp({ url: "/subcategorias" });

    console.log(error);


    useEffect(() => {
        categorias.startHttp();
        subcategorias.startHttp();
        // return () => model.setError?.(null);
    }, []);

    return (
        <React.Fragment>
            {
                Producto.getFillableTable().map((element, i) => {
                    return !Boolean(element.ignore) && (
                        <InputComponent key={i} error={error?.[element.name]}>
                            <StyleInput
                                name={element.name}
                                label={element.label}
                                value={state[element.name] ?? ""}
                                onChange={({ target }) => dispatch({ [element.name]: target.value })}
                            />
                        </InputComponent>
                    );
                })
            }

            <FilterProductos />

            {/* <InputComponent
                loading={categorias.loading == LOAD.progress}
                error={error.IdCategoria}
                props={{ minWidth: "100px", right: 40 }}>

                <SelectComponent
                    id="Categoria"
                    label="Categoria"
                    options={categorias.response ?? []}
                    configOptions={{ id: "id", value: "Nombre" }}
                    props={{
                        label: "Categoria",
                        name: "IdCategoria",
                        value: state.IdCategoria ?? "",
                        disabled,
                        onChange: ({ target }) => dispatch({ IdCategoria: target.value })
                    }}
                />
            </InputComponent>

            <InputComponent
                loading={subcategorias.loading == LOAD.progress}
                error={error.IdSubCategoria}
                props={{ minWidth: "100px", right: 40 }}>
                <SelectComponent
                    id="SubCategoria"
                    label="Sub Categoria"
                    options={subcategorias.response ?? []}
                    configOptions={{ id: "id", value: "Nombre" }}
                    props={{
                        label: "Sub Categoria",
                        name: "IdSubCategoria",
                        value: state.IdCategoria ?? "",
                        disabled,
                        onChange: ({ target }) => {
                            console.log(target);

                        }
                    }}
                />
            </InputComponent> */}


            {/* 

            <InputComponent
                name="Precio"
                label={"Precio"}
                value={model?.response?.Precio ?? ""}
                error={model?.error?.data?.Precio ?? null}
                disabled={disabled} />

            <InputComponent
                name="Stock"
                label={"Stock"}
                value={model?.response?.Stock ?? ""}
                error={model?.error?.data?.Stock ?? null}
                disabled={disabled} />

            <SelectComponent
                minWidth="150px"
                loading={categorias.loading == LOAD.progress}
                name="IdCategoria"
                label={"Categoria"}
                items={categorias.response ?? []}
                configItems={{ id: "id", value: "Nombre" }}
                defaultValue={model?.response?.IdCategoria ?? ""}
                error={model?.error?.data?.IdCategoria ?? null}
                disabled={disabled}
            />
            <SelectComponent
                minWidth="150px"
                loading={subcategorias.loading == LOAD.progress}
                name="IdSubCategoria"
                label={"Sub Categoria"}
                items={subcategorias.response ?? []}
                configItems={{ id: "id", value: "Nombre" }}
                defaultValue={model?.response?.IdSubCategoria ?? ""}
                error={model?.error?.data?.IdSubCategoria ?? null}
                disabled={disabled}
            /> */}
            {children}
        </React.Fragment>
    );

}

export default FormProducto;