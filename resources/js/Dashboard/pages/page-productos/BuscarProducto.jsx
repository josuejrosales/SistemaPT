
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LOAD from '../../global/load';
import ModalComponent from '../../components/ModalComponent';
import TitleSection from '../../components/TitleSection';
import getIcon from '../../components/Icons';
import { Box, Button, Typography } from '@mui/material';
import { InputComponent, StyleInput } from '../../components/FormComponent';
import CardComponent from '../../components/CardComponent';

const modalInitial = { title: "" };

function BuscarProducto({ data, onSelected = () => { } }) {

    const [value, setValue] = useState(null);
    const [counted, setCounted] = useState(1);

    const [modalOpen, setModalOpen] = useState(false);
    const [modal, setModal] = useState(modalInitial);

    useEffect(() => {
        return () => { setValue(null); setCounted(1) }
    }, [modalOpen]);

    return (

        <React.Fragment>
            <Button onClick={() => {
                setModal({ title: "Buscar producto" });
                setModalOpen(true);
            }}>Agregar producto</Button>
            <ModalComponent
                overflow="visible"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                Title={() => <TitleSection title={modal.title} Icon={() => getIcon(modal.type)} />}
                actions={() =>
                    value && <Button onClick={() => {
                        setModalOpen(false);
                        onSelected(value, counted);
                    }}>add</Button>
                }
                onExited={() => setModal(modalInitial)}>

                <Box display={'flex'} gap={2} mb={2}>
                    <Autocomplete
                        loading={data.loading == LOAD.complete ? false : true}
                        disablePortal
                        options={data.response ?? []}
                        sx={{ width: 300 }}
                        getOptionLabel={(option) => option.Nombre}
                        onChange={(_, v) => setValue(v)}
                        renderInput={(params) => <TextField {...params} label="Nombre del producto" />}
                    />

                    <InputComponent props={{ maxWidth: "100px" }}>
                        <StyleInput
                            type='number'
                            label='Cantidad'
                            value={counted}
                            onChange={({ target }) => target.value > 0 && setCounted(target.value)}
                        />
                    </InputComponent>
                </Box>
                {value &&
                    <CardComponent imgUrl={value.Photo}>
                        <Typography variant="h6" component="div">
                            {value.Nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Precio : {value.Precio}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Stock : {value.Stock}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {value.Descripcion}
                        </Typography>
                    </CardComponent>
                }
            </ModalComponent>
        </React.Fragment>
    );
}

export default BuscarProducto;