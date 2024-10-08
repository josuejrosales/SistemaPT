import React, { useEffect, useRef, useState } from 'react';
import TableComponent from '../../components/TableComponent';
import { Box, Button, Divider, IconButton } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TitleSection from '../../components/TitleSection';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ModalComponent from '../../components/ModalComponent';

import useHttp from '../../hooks/useHttp';
import MaskTable from '../../components/MaskTable';
import LOAD from '../../global/load';
import getIcon from '../../components/Icons';
import LoadingButton from '@mui/lab/LoadingButton';
import { Pedido } from '../../class/Pedido';
import DetallePedido from './DetallePedido';

const modalInitial = { title: "", type: "", data: {}, actions: () => { } };

const Pedidos = () => {

    const form = useRef();
    const pedidos = useHttp({ url: "/pedidos" });
    const pedido = useHttp({ alert: true });

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modal, setModal] = useState(modalInitial);

    useEffect(() => {
        if (pedido.loading == LOAD.complete) {
            setModalOpen(false);
            pedidos.startHttp();
        }
    }, [pedido.loading])

    useEffect(() => {
        pedidos.startHttp();
    }, [])

    return (
        <Box gap={1} display={'flex'} flexDirection={"column"} overflow={'hidden'} width={"100%"}>
            <TitleSection Icon={() => <LocalShippingIcon fontSize='large' />} title={"Pedidos"}>
                <IconButton onClick={() => {
                    setModal({
                        ...modal, title: "Registrar pedido", type: "ADD-PEDIDO", actions: (load) =>
                            <LoadingButton
                                loading={load == LOAD.progress}
                                onClick={() => pedido.startHttp({ url: "/pedidos", method: "POST", data: form.current })}>
                                Save
                            </LoadingButton>
                    })
                    setModalOpen(true);
                }}>
                    <PostAddIcon fontSize='large' />
                </IconButton>
            </TitleSection>

            <Divider sx={{ mb: 2 }} />

            {pedidos.loading == LOAD.complete ?
                <TableComponent
                    data={pedidos.response}
                    header={Pedido.getFillable()}
                    options={(selected) =>
                        <Button variant='contained' onClick={() => {
                            setModal({ ...modal, title: "Detalle del pedido", type: "SHOW", data: selected })
                            setModalOpen(true);
                        }}>Show</Button>} />

                : <MaskTable numColumns={Pedido.getFillable().length} />}


            <ModalComponent
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                Title={() => <TitleSection title={modal.title} Icon={() => getIcon(modal.type)} />}
                actions={() => modal.actions(pedido.loading)}
                onExited={() => {
                    setModal(modalInitial);
                    pedido.reset()
                }}>

                {(() => {
                    switch (modal.type) {
                        case "ADD-PEDIDO":
                            return (
                                <DetallePedido disabled={false} form={form} />
                            );
                        case "SHOW":
                            return (
                                <DetallePedido data={modal.data} disabled={true} />
                            );
                        default:
                            break;
                    }
                })()}
            </ModalComponent>
        </Box >

    );
};

export default Pedidos;
