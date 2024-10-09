import PropTypes from 'prop-types';
import { Box, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select, styled, TextField } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../contexts/appContext";
import Loading from './Loading';

function SelectComponent({ id, label = "", options = [], configOptions = {}, props }) {
    return (
        <React.Fragment>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                {...props}>

                <MenuItem value="">
                    <em>None</em>
                </MenuItem>

                {options.map((e, i) =>
                    <MenuItem
                        key={i}
                        value={e[configOptions.id]}>
                        {e[configOptions.value]}
                    </MenuItem>
                )}
            </Select>
        </React.Fragment>
    );
}

const StyleInput = styled(TextField)({
    '&.bg-black label': {
        color: "white"
    },
    '&.bg-black .css-y1qizs-MuiInputBase-root-MuiFilledInput-root': {
        borderRadius: "inherit"
    },
    '&.bg-black input': {
        backgroundColor: "#1b1b1f",
        borderRadius: "inherit",
        color: "white",
        textAlign: "end",
        textFillColor: "inherit",
    },
})

function InputComponent({
    error = null,
    loading = false,
    props = {},
    children
}) {

    return (
        <Grid2 flexGrow={1} {...props} >
            <FormControl fullWidth >
                {loading && <Box position={'absolute'}
                    right={props.right ?? 20}
                    top={0}
                    bottom={0}
                    display={'flex'}
                    alignItems={'center'}>

                    <Loading size={25} />

                </Box>}
                {children}
                {error && <FormHelperText sx={{ color: '#d32f2f' }}>{error[0]}</FormHelperText>}
            </FormControl>
        </Grid2>
    );
}

function FormComponent({ _ref = null, children }) {

    const { sizeSM } = useContext(AppContext);

    return (
        <form
            ref={_ref}
            onSubmit={e => e.preventDefault()}
            style={{ display: "flex", gap: 10, flexDirection: "column" }}>
            <Grid2 container spacing={2} columns={sizeSM ? 1 : 2}>
                {children}
            </Grid2>
        </form>
    )
}

FormComponent.propTypes = {
    _ref: PropTypes.shape({
        current: PropTypes.instanceOf(HTMLFormElement),
    }),
};

export { SelectComponent, InputComponent, FormComponent, StyleInput };
