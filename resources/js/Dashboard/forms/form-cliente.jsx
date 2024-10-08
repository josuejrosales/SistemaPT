import { useEffect } from "react";
import { FormComponent, InputComponent } from "../components/FormComponent";

function FormCliente({ form, model, children, disabled = false }) {

    useEffect(() => {
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
                name="Email"
                label={"Correo"}
                value={model?.response?.Email ?? ""}
                error={model?.error?.data?.Email ?? null}
                disabled={disabled} />

            <InputComponent
                name="Telefono"
                label={"Telefono"}
                value={model?.response?.Telefono ?? ""}
                error={model?.error?.data?.Telefono ?? null}
                disabled={disabled} />

            <InputComponent
                name="Direccion"
                label={"Direccion"}
                value={model?.response?.Direccion ?? ""}
                error={model?.error?.data?.Direccion ?? null}
                disabled={disabled} />

            {children}
        </FormComponent>
    );

}

export default FormCliente;