import { Box, Button, Divider, IconButton } from "@mui/material";
import TitleSection from "../../components/TitleSection";
import StoreIcon from '@mui/icons-material/Store';
import { useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/useHttp";
import LOAD from "../../global/load";
import TableComponent from "../../components/TableComponent";
import MaskTable from "../../components/MaskTable";
import { Cliente } from "../../class/Cliente";
import ModalComponent from "../../components/ModalComponent";
import getIcon from "../../components/Icons";
import LoadingButton from '@mui/lab/LoadingButton';
import FormCliente from "../../forms/form-cliente";

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
                    header={Cliente.getFillable()}
                    options={(selected) =>
                        <Button variant='contained' onClick={() => {
                            setModal({ ...modal, title: "Detalle del cliente", type: "SHOW", data: selected })
                            setModalOpen(true);
                        }}>Show</Button>} />

                : <MaskTable numColumns={Cliente.getFillable().length} />}


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
                                <FormCliente
                                    form={form}
                                    model={cliente} />
                            );
                        case "SHOW":
                            return (
                                <FormCliente
                                    form={form}
                                    model={{ response: modal.data }}
                                    disabled={true} />
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