import { Box, Divider, IconButton, Typography } from "@mui/material";
import TitleSection from "../../components/TitleSection";
import React, { useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/useHttp";
import LOAD from "../../global/load";
import TableComponent from "../../components/TableComponent";
import MaskTable from "../../components/MaskTable";
import { Cliente } from "../../class/Cliente";
import ModalComponent from "../../components/ModalComponent";
import getIcon from "../../components/Icons";
import LoadingButton from '@mui/lab/LoadingButton';
import DetalleCliente from "./DetalleCliente";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const modalInitial = { title: "", type: "", data: {}, actions: () => { } };

function Clientes() {

    const form = useRef();

    const clientes = useHttp({ url: "/clientes" });
    const cliente = useHttp({ alert: true });

    const [modalOpen, setModalOpen] = useState(false);
    const [modal, setModal] = useState(modalInitial);

    useEffect(() => {
        if (cliente.loading == LOAD.complete) {
            setModalOpen(false);
            clientes.startHttp();
        }
    }, [cliente.loading])

    useEffect(() => {
        clientes.startHttp();
    }, [])

    return (
        <Box gap={1} display={'flex'} flexDirection={"column"} overflow={'hidden'} width={"100%"}>
            <TitleSection Icon={() => getIcon("ADD-PERSON")} title={"Clientes"}>
                <IconButton onClick={() => {
                    setModal({
                        ...modal, title: "Registrar cliente", type: "ADD-PERSON", actions: (load) =>
                            <LoadingButton
                                loading={load == LOAD.progress}
                                onClick={() => cliente.startHttp({ url: "/clientes", method: "POST", data: form.current })}>
                                Save
                            </LoadingButton>
                    })
                    setModalOpen(true);
                }}>
                    {getIcon("ADD-REGISTER")}
                </IconButton>
            </TitleSection>

            <Divider sx={{ mb: 2 }} />

            {clientes.loading == LOAD.complete ?
                <TableComponent
                    data={clientes.response}
                    header={Cliente.getFillableTable()}
                    options={(selected) =>
                        <React.Fragment>
                            <IconButton variant='contained' onClick={() => {
                                setModal({ ...modal, title: "Detalle del cliente", type: "SHOW", data: selected })
                                setModalOpen(true);
                            }}>
                                <VisibilityIcon />
                            </IconButton>
                            <IconButton variant='contained' onClick={() => {
                                setModal({
                                    ...modal, title: "Eliminar cliente", type: "DELETE", data: selected, actions: (load) =>
                                        <LoadingButton
                                            loading={load == LOAD.progress}
                                            onClick={() => cliente.startHttp({ url: `/clientes/${selected.id}`, method: "DELETE" })}>
                                            Eliminar
                                        </LoadingButton>
                                })
                                setModalOpen(true);
                            }}>
                                <DeleteIcon />
                            </IconButton>

                        </React.Fragment>
                    } />

                : <MaskTable numColumns={Cliente.fillable.length} />}


            <ModalComponent
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                Title={() => <TitleSection title={modal.title} Icon={() => getIcon(modal.type)} />}
                actions={() => modal.actions(cliente.loading)}
                onExited={() => {
                    setModal(modalInitial);
                    cliente.reset()
                }}>

                {(() => {
                    switch (modal.type) {
                        case "ADD-PERSON":
                            return (
                                <DetalleCliente
                                    formRef={form}
                                    model={cliente}
                                />);
                        case "SHOW":
                            return (
                                <DetalleCliente
                                    formRef={form}
                                    model={{ response: modal.data }}
                                    disabled={true}
                                />);
                        case "DELETE":
                            return (
                                <React.Fragment>
                                    <Typography>Nombre : {modal.data?.Nombre ?? ""}</Typography>
                                    <Typography>Correo : {modal.data?.Email ?? ""}</Typography>
                                </React.Fragment>
                            );
                        default:
                            break;
                    }
                })()}
            </ModalComponent>
        </Box >
    );
}

export default Clientes;