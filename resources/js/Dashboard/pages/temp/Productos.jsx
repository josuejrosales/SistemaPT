// import React, { useEffect, useRef, useState } from 'react';
// import TableComponent from '../../components/TableComponent';
// import { Producto } from '../../class/Producto';
// import { Box, Button, Divider, IconButton } from '@mui/material';
// import StoreIcon from '@mui/icons-material/Store';
// import TitleSection from '../../components/TitleSection';
// import PostAddIcon from '@mui/icons-material/PostAdd';
// import ModalComponent from '../../components/ModalComponent';

// import FormProducto from '../../forms/form-producto';
// import useHttp from '../../hooks/useHttp';
// import MaskTable from '../../components/MaskTable';
// import LOAD from '../../global/load';
// import getIcon from '../../components/Icons';
// import LoadingButton from '@mui/lab/LoadingButton';
// import FilterProductos from './filter-productos';

// const modalInitial = { title: "", type: "", data: {}, actions: () => { } };

// const Productos = () => {

//     const form = useRef();
//     const productos = useHttp({ url: "/productos" });
//     const producto = useHttp({ alert: true });

//     const [modalOpen, setModalOpen] = React.useState(false);
//     const [modal, setModal] = useState(modalInitial);

//     useEffect(() => {
//         if (producto.loading == LOAD.complete) {
//             setModalOpen(false);
//             productos.startHttp();
//         }
//     }, [producto.loading])

//     useEffect(() => {
//         productos.startHttp();
//     }, [])

//     return (
//         <Box gap={1} display={'flex'} flexDirection={"column"} overflow={'hidden'} width={"100%"}>
//             <TitleSection Icon={() => <StoreIcon fontSize='large' />} title={"Productos"}>
//                 <IconButton onClick={() => {
//                     setModal({
//                         ...modal, title: "Registrar producto", type: "ADD", actions: () =>
//                             <LoadingButton
//                                 loading={producto.loading == LOAD.progress}
//                                 onClick={() => producto.startHttp({ url: "/productos", method: "POST", data: form.current })}>
//                                 Save
//                             </LoadingButton>
//                     })
//                     setModalOpen(true);
//                 }}>
//                     <PostAddIcon fontSize='large' />
//                 </IconButton>
//             </TitleSection>

//             <Divider sx={{ mb: 2 }} />

//             <FilterProductos onChange={() => {
//                 // change filter
//             }} />

//             {productos.loading == LOAD.complete ?
//                 <TableComponent
//                     data={productos.response}
//                     header={Producto.getFillable()}
//                     options={(selected) =>
//                         <Button variant='contained' onClick={() => {
//                             setModal({ ...modal, title: "Detalle del producto", type: "SHOW", data: selected })
//                             setModalOpen(true);
//                         }}>Show</Button>} />

//                 : <MaskTable numColumns={Producto.getFillable().length} />}


//             <ModalComponent
//                 open={modalOpen}
//                 onClose={() => setModalOpen(false)}
//                 Title={() => <TitleSection title={modal.title} Icon={() => getIcon(modal.type)} />}
//                 actions={modal.actions}
//                 onExited={() => {
//                     setModal(modalInitial);
//                     producto.reset()
//                 }}>

//                 {(() => {
//                     switch (modal.type) {
//                         case "ADD":
//                             return (
//                                 <FormProducto
//                                     form={form}
//                                     model={producto} />
//                             );
//                         case "SHOW":
//                             return (
//                                 <FormProducto
//                                     form={form}
//                                     model={{ response: modal.data }}
//                                     disabled={true}
//                                 />
//                             );
//                         default:
//                             break;
//                     }
//                 })()}
//             </ModalComponent>
//         </Box >

//     );
// };

// export default Productos;
