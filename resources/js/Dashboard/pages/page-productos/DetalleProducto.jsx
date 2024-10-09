import { useEffect, useReducer } from "react";
import FormProducto from "../../forms/form-producto";
import { FormComponent } from "../../components/FormComponent";
import { Producto } from "../../class/Producto";
import FilterProductos from "./FilterProductos";

const funReducer = (state, action) => ({ ...state, ...action });

function DetalleProduto({ formRef = null, model = null, save = null, disabled = false }) {

    const [formData, setFormData] = useReducer(funReducer, {});

    useEffect(() => {
        model.response && setFormData(Producto.filterParams(model.response))
    }, [model.response]);

    return (
        <FormComponent _ref={formRef}>
            <FormProducto
                state={formData}
                dispatch={setFormData}
                error={model.error?.data ?? {}}
                disabled={disabled}>

                <FilterProductos
                    save={save}
                    state={formData}
                    error={model.error?.data ?? {}}
                    disabled={disabled} />

            </FormProducto>
        </FormComponent>
    );
}

export default DetalleProduto;