import { useEffect } from "react";
import { FormComponent, InputComponent, SelectComponent } from "../components/FormComponent";
import useHttp from "../hooks/useHttp";
import LOAD from "../global/load";

function FormProducto({ form = null, model, children, disabled = false }) {

    const categorias = useHttp({ url: "/categorias" });
    const subcategorias = useHttp({ url: "/subcategorias" });

    useEffect(() => {
        categorias.startHttp();
        subcategorias.startHttp();
        return () => model.setError?.(null);
    }, []);

    return (
        <FormComponent _ref={form}>

            <InputComponent
                name="Nombre"
                label={"Nombre"}
                value={model?.response?.Nombre ?? ""}
                error={model?.error?.data?.Nombre ?? null}
                disabled={disabled} />

            <InputComponent
                name="Descripcion"
                label={"Descripcion"}
                value={model?.response?.Descripcion ?? ""}
                error={model?.error?.data?.Descripcion ?? null}
                disabled={disabled} />

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
            />
            {children}
        </FormComponent>
    );

}

export default FormProducto;