import { Box, Divider, IconButton, Typography } from "@mui/material";
import TitleSection from "../../components/TitleSection";
import getIcon from "../../components/Icons";
import React, { useEffect, useRef, useState } from "react";
import LOAD from "../../global/load";
import useHttp from "../../hooks/useHttp";
import ModalComponent from "../../components/ModalComponent";
import LoadingButton from '@mui/lab/LoadingButton';
import { FormComponent, InputComponent, SelectComponent, StyleInput } from "../../components/FormComponent";
import MaskTable from "../../components/MaskTable";
import { MetodoPago } from "../../class/MetodoPago";
import TableComponent from "../../components/TableComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import { SubCategoria as SC } from "../../class/SubCategoria";

const modalInitial = { title: "", type: "", data: {}, actions: () => { } };

function SubCategoria() {

    const form = useRef();

    const subCategorias = useHttp({ url: "/subcategorias" });
    const subCategoria = useHttp({ alert: true });

    const categorias = useHttp({ url: "/categorias" });

    const [modalOpen, setModalOpen] = useState(false);
    const [modal, setModal] = useState(modalInitial);

    useEffect(() => {
        if (subCategoria.loading == LOAD.complete) {
            setModalOpen(false);
            subCategorias.startHttp();
        }
    }, [subCategoria.loading])

    useEffect(() => {
        subCategorias.startHttp();
        categorias.startHttp();
    }, [])

    return (
        <Box gap={1} display={'flex'} flexDirection={"column"} overflow={'hidden'} flexGrow={1}>
            <TitleSection Icon={() => getIcon("ADD-CATEGORY")} title={"Sub Categorias"}>
                <IconButton onClick={() => {
                    setModal({
                        ...modal, title: "Registrar Sub Categoria", type: "ADD-CATEGORY", actions: (load) =>
                            <LoadingButton
                                loading={load == LOAD.progress}
                                onClick={() => subCategoria.startHttp({ url: "/subcategorias", method: "POST", data: form.current })}>
                                Save
                            </LoadingButton>
                    })
                    setModalOpen(true);
                }}>
                    {getIcon("ADD-REGISTER")}
                </IconButton>
            </TitleSection>

            <Divider sx={{ mb: 2 }} />

            {subCategorias.loading == LOAD.complete ?
                <TableComponent
                    data={subCategorias.response}
                    header={SC.getFillableTable()}
                    options={(selected) =>
                        <React.Fragment>
                            <IconButton variant='contained' onClick={() => {
                                setModal({
                                    ...modal, title: "Eliminar categoria", type: "DELETE", data: selected, actions: (load) =>
                                        <LoadingButton
                                            loading={load == LOAD.progress}
                                            onClick={() => subCategoria.startHttp({ url: `/subcategorias/${selected.id}`, method: "DELETE" })}>
                                            Eliminar
                                        </LoadingButton>
                                })
                                setModalOpen(true);
                            }}>
                                <DeleteIcon />
                            </IconButton>

                        </React.Fragment>
                    } />

                : <MaskTable numColumns={SC.fillable.length} />}


            <ModalComponent
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                Title={() => <TitleSection title={modal.title} Icon={() => getIcon(modal.type)} />}
                actions={() => modal.actions(subCategoria.loading)}
                onExited={() => {
                    setModal(modalInitial);
                    subCategoria.reset()
                }}>

                {(() => {
                    switch (modal.type) {
                        case "ADD-CATEGORY":

                            return (
                                <FormComponent _ref={form}>
                                    <InputComponent
                                        loading={categorias.loading == LOAD.progress}
                                        props={{ right: 40, width: '100%' }}>

                                        <SelectComponent
                                            id="Categoria"
                                            label="Categoria"
                                            options={categorias.response ?? []}
                                            configOptions={{ id: "id", value: "Nombre" }}

                                            props={{
                                                name: "IdCategoria",
                                                label: "Categoria",
                                                // value: formData.IdCliente ?? "",
                                                // onChange: ({ target }) => setFormData({ IdCliente: target.value })
                                            }}
                                        />
                                    </InputComponent>
                                    <InputComponent props={{ width: '100%' }}>
                                        <StyleInput label="Sub Categoria" name="Nombre" />
                                    </InputComponent>
                                    <InputComponent props={{ width: '100%' }}>
                                        <StyleInput label="Descripcion" name="Descripcion" />
                                    </InputComponent>
                                </FormComponent>
                            );

                        case "DELETE":
                            console.log(modal.data);

                            return (
                                <React.Fragment>
                                    <Typography>Nombre : {modal.data?.Nombre ?? ""}</Typography>
                                    <Typography>Categoria : {modal.data?.get_categoria?.Nombre ?? ""}</Typography>
                                </React.Fragment>
                            );
                        default:
                            break;
                    }
                })()}
            </ModalComponent>
        </Box>
    );
}

export default SubCategoria;