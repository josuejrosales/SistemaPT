import { useEffect, useReducer, useRef } from "react";
import FormCliente from "../../forms/form-cliente";
import { FormComponent } from "../../components/FormComponent";
import { Cliente } from "../../class/Cliente";

const funReducer = (state, action) => ({ ...state, ...action });

function DetalleCliente({ formRef = null, model = null, disabled = false }) {

    const [formData, setFormData] = useReducer(funReducer, {});

    useEffect(() => {
        model?.response && setFormData(Cliente.filterParams(model.response))
    }, [model]);

    return (
        <FormComponent _ref={formRef}>
            <FormCliente
                state={formData}
                dispatch={setFormData}
                error={model?.error?.data ?? {}}
                disabled={disabled} />
        </FormComponent>
    );
}

export default DetalleCliente;