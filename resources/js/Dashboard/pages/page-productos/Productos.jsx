import React, { useEffect, useRef, useState } from 'react';
import TableComponent from '../../components/TableComponent';
import { Producto } from '../../class/Producto';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import TitleSection from '../../components/TitleSection';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ModalComponent from '../../components/ModalComponent';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import useHttp from '../../hooks/useHttp';
import MaskTable from '../../components/MaskTable';
import LOAD from '../../global/load';
import getIcon from '../../components/Icons';
import LoadingButton from '@mui/lab/LoadingButton';
import FilterProductos from './FilterProductos';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChangeImageProducto from './ChangeImageProducto';
import DetalleProduto from './DetalleProducto';
import DeleteIcon from '@mui/icons-material/Delete';

const modalInitial = { title: "", type: "", data: {}, actions: () => { } };

const Productos = () => {

    const form = useRef();
    const formImage = useRef();

    const productos = useHttp({ url: "/productos" });
    const producto = useHttp({ alert: true });
    const [saveData, setSaveData] = useState(null);

    const [modalOpen, setModalOpen] = React.useState(false);
    const [modal, setModal] = useState(modalInitial);

    useEffect(() => {
        if (producto.loading == LOAD.complete) {
            setModalOpen(false);
            productos.startHttp();
        }
    }, [producto.loading])

    useEffect(() => {
        productos.startHttp();
    }, [])

    return (
        <Box gap={1} display={'flex'} flexDirection={"column"} overflow={'hidden'} width={"100%"}>
            <TitleSection Icon={() => <ShoppingCartIcon fontSize='large' />} title={"Productos"}>
                <IconButton onClick={() => {
                    setModal({
                        ...modal, title: "Registrar producto", type: "ADD", actions: (load) =>
                            <LoadingButton
                                loading={load == LOAD.progress}
                                onClick={() => producto.startHttp({ url: "/productos", method: "POST", data: form.current })}>
                                Save
                            </LoadingButton>
                    })
                    setModalOpen(true);
                }}>
                    <PostAddIcon fontSize='large' />
                </IconButton>
            </TitleSection>

            <Divider sx={{ mb: 2 }} />

            <FilterProductos model={productos} onChange={(url) => {
                productos.startHttp({ url: `/productos/show?${url.toString()}` })
            }} onCancel={() => productos.startHttp()} onDataModel={data => setSaveData(data)} />

            {productos.loading == LOAD.complete ?
                <TableComponent
                    data={productos.response}
                    header={Producto.getFillableTable()}
                    options={(selected) =>
                        <Box display={'flex'} gap={1}>
                            <IconButton variant='contained' onClick={() => {
                                setModal({ ...modal, title: "Detalle del producto", type: "SHOW", data: selected })
                                setModalOpen(true);
                            }}>
                                <VisibilityIcon />
                            </IconButton>
                            <IconButton variant='contained' onClick={() => {
                                setModal({
                                    ...modal, data: selected, title: `Establecer imagen ( ${selected.Nombre} )`, type: "UPDATE-PHOTO", actions: (load) =>
                                        <LoadingButton
                                            loading={load == LOAD.progress}
                                            onClick={() => producto.startHttp({ url: `/producto-image/${selected.id}`, method: "POST", data: formImage.current })}>
                                            Save
                                        </LoadingButton>
                                })
                                setModalOpen(true);
                            }}>
                                <InsertPhotoIcon />
                            </IconButton>
                            <IconButton variant='contained' onClick={() => {
                                setModal({
                                    ...modal, title: "Eliminar Producto", type: "DELETE", data: selected, actions: (load) =>
                                        <LoadingButton
                                            loading={load == LOAD.progress}
                                            onClick={() => producto.startHttp({ url: `/productos/${selected.id}`, method: "DELETE" })}>
                                            Eliminar
                                        </LoadingButton>
                                })
                                setModalOpen(true);
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    } />

                : <MaskTable numColumns={Producto.getFillableTable().length} />}


            <ModalComponent
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                Title={() => <TitleSection title={modal.title} Icon={() => getIcon(modal.type)} />}
                actions={() => modal.actions(producto.loading)}
                onExited={() => {
                    setModal(modalInitial);
                    producto.reset()
                }}>

                {(() => {
                    switch (modal.type) {
                        case "ADD":
                            return <DetalleProduto formRef={form} model={producto} save={saveData} />
                        case "SHOW":
                            return <DetalleProduto model={{ response: modal.data }} disabled={true} save={saveData} />
                        case "DELETE":
                            return (
                                <React.Fragment>
                                    <Typography>Nombre : {modal.data?.Nombre ?? ""}</Typography>
                                    <Typography>Precio : {modal.data?.Precio ?? ""}</Typography>
                                </React.Fragment>
                            );
                        case "UPDATE-PHOTO": return (<ChangeImageProducto form={formImage} data={modal.data} />);
                        default:
                            break;
                    }
                })()}
            </ModalComponent>
        </Box >

    );
};

export default Productos;
