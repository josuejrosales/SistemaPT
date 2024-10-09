import { Box } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { InputComponent, SelectComponent } from "../../components/FormComponent";
import LOAD from "../../global/load";

const config = { url: "/productos-filters" }

const funReducer = (state, action) => ({ ...state, ...action });

function FilterProductos({ save = null, state = null, error = {}, disabled = false, onDataModel = (obj) => { }, onChange = () => { }, onCancel = () => { } }) {

    const { response, loading, startHttp, setData } = useHttp(config);

    const [categorias, setCategorias] = useState([]);
    const [subCategorias, setSubCategorias] = useState([]);

    const [formData, setFormData] = useReducer(funReducer, { IdCategoria: "", IdSubCategoria: "" });

    const resetFilters = () => {
        const { categorias, sub_categorias } = response;
        setCategorias(categorias)
        setSubCategorias(sub_categorias)
        onDataModel({ categorias, sub_categorias })
    }

    useEffect(() => {
        if (response) {
            if (formData.IdCategoria == "") resetFilters()
            else setSubCategorias(response.sub_categorias.filter(item => formData.IdCategoria == item.IdCategoria))
        }
    }, [formData.IdCategoria]);

    useEffect(() => {
        if (response) {
            if (formData.IdSubCategoria == "") resetFilters()
            else setCategorias(response.categorias.filter(item => {
                const found = response.sub_categorias.find(x => x.id == formData.IdSubCategoria);
                return item.id == (found ? found.IdCategoria : 0)
            }))
        }
    }, [formData.IdSubCategoria]);

    useEffect(() => {
        if (formData.IdCategoria == "" && formData.IdSubCategoria == "") onCancel();
        if (formData.IdCategoria && formData.IdSubCategoria) {
            onChange(new URLSearchParams({
                "IdCategoria": formData.IdCategoria,
                "IdSubCategoria": formData.IdSubCategoria,
            }))
        }
    }, [formData.IdCategoria, formData.IdSubCategoria]);

    useEffect(() => {
        if (state) setFormData({ IdCategoria: state.IdCategoria, IdSubCategoria: state.IdSubCategoria })
        response && resetFilters()
    }, [response]);


    useEffect(() => {
        if (save) setData(save)
        else startHttp();
    }, []);

    return (
        <Box display={'flex'} gap={2} width={"100%"}>
            <InputComponent
                loading={loading == LOAD.progress}
                error={error.IdCategoria}
                props={{ right: 40 }} >

                <SelectComponent
                    id="Categoria"
                    label="Categoria"
                    options={categorias ?? []}
                    configOptions={{ id: "id", value: "Nombre" }}

                    props={{
                        disabled,
                        name: "IdCategoria",
                        label: "Categoria",
                        value: formData.IdCategoria ?? "",
                        onChange: ({ target }) => setFormData({ IdCategoria: target.value })
                    }}
                />
            </InputComponent>
            <InputComponent
                loading={loading == LOAD.progress}
                error={error.IdSubCategoria}
                props={{ right: 40 }}>

                <SelectComponent
                    id="SubCategoria"
                    label="Sub Categoria"
                    options={subCategorias ?? []}
                    configOptions={{ id: "id", value: "Nombre" }}

                    props={{
                        disabled,
                        name: "IdSubCategoria",
                        label: "Sub Categoria",
                        value: formData.IdSubCategoria ?? "",
                        onChange: ({ target }) => setFormData({ IdSubCategoria: target.value })
                    }}
                />
            </InputComponent>
        </Box>
    );
}

export default FilterProductos;