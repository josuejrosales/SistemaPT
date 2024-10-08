import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { InputComponent, SelectComponent } from "../../components/FormComponent";
import LOAD from "../../global/load";

const config = { url: "/productos-filters" }

function FilterProductos({ onChange = () => { }, onCancel = () => { } }) {

    const { response, loading, startHttp } = useHttp(config);

    const [categorias, setCategorias] = useState([]);
    const [subCategorias, setSubCategorias] = useState([]);

    const [categoriaId, setCategoriaId] = useState(null);
    const [subCategoriaId, setSubCategoriaId] = useState(null);

    const resetFilters = () => {
        setCategorias(response.categorias)
        setSubCategorias(response.sub_categorias)
    }

    useEffect(() => {
        if (response) {
            if (categoriaId == "") resetFilters()
            else setSubCategorias(response.sub_categorias.filter(item => categoriaId == item.IdCategoria))
        }
    }, [categoriaId]);

    useEffect(() => {
        if (response) {
            if (subCategoriaId == "") resetFilters()
            else setCategorias(response.categorias.filter(item => {
                const found = response.sub_categorias.find(x => x.id == subCategoriaId);
                return item.id == (found ? found.IdCategoria : 0)
            }))
        }
    }, [subCategoriaId]);

    useEffect(() => {
        if (categoriaId == "" && subCategoriaId == "") onCancel();
        if (categoriaId && subCategoriaId) {
            onChange(new URLSearchParams({
                "IdCategoria": categoriaId,
                "IdSubCategoria": subCategoriaId,
            }))
        }
    }, [categoriaId, subCategoriaId]);

    useEffect(() => {
        response && resetFilters()
    }, [response]);

    useEffect(() => {
        startHttp();
    }, []);

    return (
        <Box display={'flex'} gap={2} width={"100%"}>
            <InputComponent>
                <SelectComponent
                    label="Categoria"
                    defaultValue={""}
                    items={categorias ?? []}
                    configItems={{ id: "id", value: "Nombre" }}
                    value={categoriaId}
                    onChange={value => setCategoriaId(value)}
                    loading={loading == LOAD.progress}
                    props={{
                        label: "Categoria"
                    }}
                />
            </InputComponent>
            <InputComponent>
                <SelectComponent
                    label="Sub Categoria"
                    defaultValue={""}
                    items={subCategorias ?? []}
                    configItems={{ id: "id", value: "Nombre" }}
                    value={subCategoriaId}
                    onChange={value => setSubCategoriaId(value)}
                    loading={loading == LOAD.progress}
                    props={{
                        label: "Sub Categoria"
                    }}
                />
            </InputComponent>
        </Box>
    );
}

export default FilterProductos;