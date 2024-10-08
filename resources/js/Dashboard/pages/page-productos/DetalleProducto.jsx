import { useEffect, useReducer } from "react";
import FormProducto from "../../forms/form-producto";
import { FormComponent } from "../../components/FormComponent";
import { Producto } from "../../class/Producto";

const funReducer = (state, action) => ({ ...state, ...action });

function DetalleProduto({ formRef = null, model = null, disabled = false }) {

    const [formData, setFormData] = useReducer(funReducer, {});

    useEffect(() => {
        model?.response && setFormData(Producto.filterParams(model.response))
    }, [model]);

    return (
        <FormComponent _ref={formRef}>
            <FormProducto
                error={model.error?.data ?? {}}
                state={formData}
                dispatch={setFormData}
            />
        </FormComponent>
    );
}

export default DetalleProduto;