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


const modalInitial = { title: "", type: "", data: {}, actions: () => { } };

function TipoPago() {

    const form = useRef();

    const tipoPagos = useHttp({ url: "/metodo_pago" });
    const tipoPago = useHttp({ alert: true });

    const [modalOpen, setModalOpen] = useState(false);
    const [modal, setModal] = useState(modalInitial);

    useEffect(() => {
        if (tipoPago.loading == LOAD.complete) {
            setModalOpen(false);
            tipoPagos.startHttp();
        }
    }, [tipoPago.loading])

    useEffect(() => {
        tipoPagos.startHttp();
    }, [])

    return (
        <Box gap={1} display={'flex'} flexDirection={"column"} overflow={'hidden'} flexGrow={1}>
            <TitleSection Icon={() => getIcon("ADD-PAGO")} title={"Tipo de pagos"}>
                <IconButton onClick={() => {
                    setModal({
                        ...modal, title: "Registrar tipo de pago", type: "ADD-PAGO", actions: (load) =>
                            <LoadingButton
                                loading={load == LOAD.progress}
                                onClick={() => tipoPago.startHttp({ url: "/metodo_pago", method: "POST", data: form.current })}>
                                Save
                            </LoadingButton>
                    })
                    setModalOpen(true);
                }}>
                    {getIcon("ADD-REGISTER")}
                </IconButton>
            </TitleSection>

            <Divider sx={{ mb: 2 }} />

            {tipoPagos.loading == LOAD.complete ?
                <TableComponent
                    data={tipoPagos.response}
                    header={MetodoPago.getFillableTable()}
                    options={(selected) =>
                        <React.Fragment>
                            <IconButton variant='contained' onClick={() => {
                                setModal({
                                    ...modal, title: "Eliminar cliente", type: "DELETE", data: selected, actions: (load) =>
                                        <LoadingButton
                                            loading={load == LOAD.progress}
                                            onClick={() => tipoPago.startHttp({ url: `/metodo_pago/${selected.id}`, method: "DELETE" })}>
                                            Eliminar
                                        </LoadingButton>
                                })
                                setModalOpen(true);
                            }}>
                                <DeleteIcon />
                            </IconButton>

                        </React.Fragment>
                    } />

                : <MaskTable numColumns={MetodoPago.fillable.length} />}


            <ModalComponent
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                Title={() => <TitleSection title={modal.title} Icon={() => getIcon(modal.type)} />}
                actions={() => modal.actions(tipoPago.loading)}
                onExited={() => {
                    setModal(modalInitial);
                    tipoPago.reset()
                }}>

                {(() => {
                    switch (modal.type) {
                        case "ADD-PAGO":
                            return (
                                <FormComponent _ref={form}>
                                    <InputComponent>
                                        <StyleInput label="Tipo de pago" name="Nombre" />
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

export default TipoPago;