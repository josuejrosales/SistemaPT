import React, { useEffect, useState } from 'react';
import { Typography, Box, styled } from '@mui/material';

const BoxImage = styled(Box)({
    width: '100%',
    height: '200px',
    border: '2px dashed #3f51b5',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    padding: "2rem"
})

const FormImage = ({ name, img = null }) => {

    const [image, setImage] = useState(null);

    const changeImage = (event) => {
        const file = event.target.files[0];
        file && setImage(URL.createObjectURL(file));
    };

    useEffect(() => {
        img && setImage(img);
    }, [img]);

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto' }}>

            <input
                name={name}
                type="file"
                accept="image/*"
                id="file-img"
                onChange={changeImage}
                style={{ display: 'none' }} />

            <label htmlFor="file-img">
                <BoxImage sx={{ backgroundColor: image ? 'transparent' : '#f5f5f5', }}>
                    {image ? (
                        <img
                            src={image}
                            alt="Vista previa"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: '4px'
                            }}
                        />)
                        : (
                            <Typography
                                ariant="body1"
                                color="#3f51b5">
                                Selecciona una Imagen
                            </Typography>
                        )}
                </BoxImage>
            </label>
        </Box>
    );
};

export default FormImage;
