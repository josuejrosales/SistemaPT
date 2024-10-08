import PropTypes from 'prop-types';
import { Box, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select, styled, TextField } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../contexts/appContext";
import Loading from './Loading';

function SelectComponent({
    name = "default",
    label = "",
    onChange = () => { },
    required = false,
    minWidth = "inherit",
    defaultValue = "",
    items = [],
    disabled = false,
    loading = false,
    error = null,
    configItems = {}
}) {

    return (
        <Grid2 flexGrow={1} minWidth={minWidth}>
            <FormControl fullWidth>
                {loading && <Box position={'absolute'} right={40} top={0} bottom={0} display={'flex'} alignItems={'center'}>
                    <Loading size={25} />
                </Box>}
                <InputLabel id="mode-select">{label}</InputLabel>
                <Select
                    required={required}
                    name={name}
                    labelId="mode-select"
                    label={label}
                    defaultValue={defaultValue}
                    onChange={e => onChange(e.target.value)}
                    disabled={disabled || loading ? true : false}>

                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        items.map((e, i) =>
                            <MenuItem key={i} value={e[configItems.id]}>{e[configItems.value]}</MenuItem>
                        )
                    }
                </Select>
                {error && <FormHelperText sx={{ color: '#d32f2f' }}>{error[0]}</FormHelperText>}
            </FormControl>
        </Grid2>
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
    name = "default",
    type = 'text',
    label,
    value,
    required = false,
    onChange = () => { },
    bgcolor = null,
    maxWidth = "inherit",
    _variant = "outlined",
    error = null,
    loading,
    disabled
}) {
    return (
        <Grid2 flexGrow={1} maxWidth={maxWidth}>
            <FormControl fullWidth >
                {loading && <Box position={'absolute'}
                    right={20}
                    top={0}
                    bottom={0}
                    display={'flex'}
                    alignItems={'center'}>

                    <Loading size={25} />

                </Box>}

                <StyleInput
                    type={type}
                    className={bgcolor}
                    variant={_variant}
                    label={label}
                    name={name}
                    defaultValue={value}
                    required={required}
                    onChange={e => onChange(e.target.value)}
                    slotProps={{ input: { disabled } }} />

                {error && <FormHelperText sx={{ color: '#d32f2f' }}>{error[0]}</FormHelperText>}
            </FormControl>
        </Grid2>
    );
}

function FormComponent({ _ref = null, children }) {
    const { sizeSM } = useContext(AppContext);

    const Inputs = () =>
        <Grid2 container spacing={2} columns={sizeSM ? 1 : 2}>
            {children}
        </Grid2>

    return _ref ?
        <form
            ref={_ref}
            onSubmit={e => e.preventDefault()}
            style={{ display: "flex", gap: 10, flexDirection: "column" }}>

            <Inputs />
        </form> : <Inputs />
}

FormComponent.propTypes = {
    _ref: PropTypes.shape({
        current: PropTypes.instanceOf(HTMLFormElement),
    }),
};

export { SelectComponent, InputComponent, FormComponent };
