import { Box, Divider, IconButton, Typography } from "@mui/material";
import TitleSection from "../../components/TitleSection";
import getIcon from "../../components/Icons";
import React, { useEffect, useRef, useState } from "react";
import LOAD from "../../global/load";
import useHttp from "../../hooks/useHttp";
import ModalComponent from "../../components/ModalComponent";
import LoadingButton from '@mui/lab/LoadingButton';
import { FormComponent, InputComponent, StyleInput } from "../../components/FormComponent";
import MaskTable from "../../components/MaskTable";
import { MetodoPago } from "../../class/MetodoPago";
import TableComponent from "../../components/TableComponent";
import DeleteIcon from '@mui/icons-material/Delete';
import { Categoria as CT } from "../../class/Categoria";


const modalInitial = { title: "", type: "", data: {}, actions: () => { } };

function Categoria() {

    const form = useRef();

    const categorias = useHttp({ url: "/categorias" });
    const categoria = useHttp({ alert: true });

    const [modalOpen, setModalOpen] = useState(false);
    const [modal, setModal] = useState(modalInitial);

    useEffect(() => {
        if (categoria.loading == LOAD.complete) {
            setModalOpen(false);
            categorias.startHttp();
        }
    }, [categoria.loading])

    useEffect(() => {
        categorias.startHttp();
    }, [])

    return (
        <Box gap={1} display={'flex'} flexDirection={"column"} overflow={'hidden'} flexGrow={1}>
            <TitleSection Icon={() => getIcon("ADD-CATEGORY")} title={"Categorias"}>
                <IconButton onClick={() => {
                    setModal({
                        ...modal, title: "Registrar categoria", type: "ADD-CATEGORY", actions: (load) =>
                            <LoadingButton
                                loading={load == LOAD.progress}
                                onClick={() => categoria.startHttp({ url: "/categorias", method: "POST", data: form.current })}>
                                Save
                            </LoadingButton>
                    })
                    setModalOpen(true);
                }}>
                    {getIcon("ADD-REGISTER")}
                </IconButton>
            </TitleSection>

            <Divider sx={{ mb: 2 }} />

            {categorias.loading == LOAD.complete ?
                <TableComponent
                    data={categorias.response}
                    header={CT.getFillableTable()}
                    options={(selected) =>
                        <React.Fragment>
                            <IconButton variant='contained' onClick={() => {
                                setModal({
                                    ...modal, title: "Eliminar categoria", type: "DELETE", data: selected, actions: (load) =>
                                        <LoadingButton
                                            loading={load == LOAD.progress}
                                            onClick={() => categoria.startHttp({ url: `/categorias/${selected.id}`, method: "DELETE" })}>
                                            Eliminar
                                        </LoadingButton>
                                })
                                setModalOpen(true);
                            }}>
                                <DeleteIcon />
                            </IconButton>

                        </React.Fragment>
                    } />

                : <MaskTable numColumns={CT.fillable.length} />}


            <ModalComponent
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                Title={() => <TitleSection title={modal.title} Icon={() => getIcon(modal.type)} />}
                actions={() => modal.actions(categoria.loading)}
                onExited={() => {
                    setModal(modalInitial);
                    categoria.reset()
                }}>

                {(() => {
                    switch (modal.type) {
                        case "ADD-CATEGORY":
                            return (
                                <FormComponent _ref={form}>
                                    <InputComponent props={{ width: '100%' }}>
                                        <StyleInput label="Nombre categoria" name="Nombre" />
                                    </InputComponent>
                                    <InputComponent rops={{ width: '100%' }}>
                                        <StyleInput label="Descripcion" name="Descripcion" />
                                    </InputComponent>
                                </FormComponent>
                            );

                        case "DELETE":
                            return (
                                <React.Fragment>
                                    <Typography>Nombre : {modal.data?.Nombre ?? ""}</Typography>
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

export default Categoria;