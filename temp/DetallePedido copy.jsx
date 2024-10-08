import { useEffect, useRef, useState } from "react";
import FormPedido from "../resources/js/Dashboard/forms/form-pedido";
import FormDetallePedido from "../resources/js/Dashboard/forms/form-detalle-pedido";
import { FormComponent } from "../resources/js/Dashboard/components/FormComponent";
import TitleSection from "../resources/js/Dashboard/components/TitleSection";
import { Box, Button, DialogActions, Divider } from "@mui/material";
import MaskTable from "../resources/js/Dashboard/components/MaskTable";
import useHttp from "../resources/js/Dashboard/hooks/useHttp";
import LOAD from "../resources/js/Dashboard/global/load";
import TableComponent from "../resources/js/Dashboard/components/TableComponent";
import { DetallePedido as DP } from "../resources/js/Dashboard/class/DetalleProducto";
import ModalComponent from "../resources/js/Dashboard/components/ModalComponent";
import getIcon from "../resources/js/Dashboard/components/Icons";
import BuscarProducto from "../resources/js/Dashboard/pages/page-pedidos/BuscarProducto";

const modalInitial = { title: "", type: "", data: {}, actions: () => { } };

function DetallePedido({ model, disabled }) {


    const form = useRef();

    const clientes = useHttp({ url: "/clientes" });
    const metodo_pagos = useHttp({ url: "/metodo_pago" });

    const detalle_pedido = useHttp({ url: "/detalle_pedido" });
    const [modalOpen, setModalOpen] = useState(false);
    const [modal, setModal] = useState(modalInitial);

    useEffect(() => {
        console.log("aqui model ? ");

        if (!Boolean(model.response)) {
            // new register
            detalle_pedido.setData([]);

        } else {
            const { id } = model.response;
            detalle_pedido.startHttp({ url: `/detalle_pedido/${id}` })
        }
    }, [model]);

    useEffect(() => {
        clientes.startHttp();
        metodo_pagos.startHttp();

        console.log("aqui principal ? ");
    }, []);



    return (
        <Box>
            <FormPedido disabled={disabled} clientes={clientes} metodo_pagos={metodo_pagos} />
            <FormComponent>
                <TitleSection title={"Productos"}>
                    <Button onClick={() => {
                        setModal({ ...modal, title: "Buscar producto", type: "ADD" });
                        setModalOpen(true);
                    }}>Agregar producto</Button>
                </TitleSection>
            </FormComponent>

            {
                detalle_pedido.loading == LOAD.complete ?
                    <TableComponent
                        data={detalle_pedido.response}
                        header={DP.getFillable()} />

                    : <MaskTable numColumns={DP.getFillable().length} />
            }


            <ModalComponent
                overflow="visible"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                Title={() => <TitleSection title={modal.title} Icon={() => getIcon(modal.type)} />}
                // actions={modal.actions}
                onExited={() => {
                    setModal(modalInitial);
                    // pedido.reset()
                }}>

                {(() => {
                    switch (modal.type) {
                        case "ADD":
                            return <BuscarProducto />
                        case "SHOW":
                            return (
                                "ver producto"
                                // <DetallePedido model={{ response: modal.data }} />
                            );
                        default:
                            break;
                    }
                })()}
            </ModalComponent>
        </Box >
    );
}

export default DetallePedido;