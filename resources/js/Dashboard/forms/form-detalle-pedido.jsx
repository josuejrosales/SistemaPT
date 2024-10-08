import { useEffect } from "react";
import { FormComponent, InputComponent, SelectComponent } from "../components/FormComponent";


function FormDetallePedido({ form = null, modelForm, children, disabled = false }) {

    useEffect(() => {
        return () => modelForm.setError?.(null);
    }, []);

    return (
        <FormComponent _ref={form}>
            <InputComponent
                name="Nombre"
                label={"Nombre"}
                value={modelForm?.response?.Nombre ?? ""}
                error={modelForm?.error?.data?.Nombre ?? null}
                disabled={disabled} />

            <InputComponent
                name="Email"
                label={"Correo"}
                value={modelForm?.response?.Email ?? ""}
                error={modelForm?.error?.data?.Email ?? null}
                disabled={disabled} />

            <InputComponent
                name="Telefono"
                label={"Telefono"}
                value={modelForm?.response?.Telefono ?? ""}
                error={modelForm?.error?.data?.Telefono ?? null}
                disabled={disabled} />

            <InputComponent
                name="Direccion"
                label={"Direccion"}
                value={modelForm?.response?.Direccion ?? ""}
                error={modelForm?.error?.data?.Direccion ?? null}
                disabled={disabled} />

            {children}
        </FormComponent>
    );

}

export default FormDetallePedido;