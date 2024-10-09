
import React from 'react';
import PropTypes, { object } from 'prop-types';
import { Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
}));

function TableComponent({ header, data, colSpanVariant = 0, disabled = false, options = null }) {

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {header.map((head, i) => <StyledTableCell key={i}>{head.label}</StyledTableCell>)}
                        {options && disabled == false && <StyledTableCell>Actions</StyledTableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length != 0 ? data.map((element, i) => (
                        <TableRow key={i}>
                            {header.map((value, j) =>
                                <TableCell sx={{ p: 1 }} key={j}>{value.resolve ? value.resolve(element[value.search]) : element[value.name]}</TableCell>
                            )}
                            {options && disabled == false && <TableCell sx={{ p: 1 }} key={i}>{options(element)}</TableCell>}
                        </TableRow>
                    )) : <TableRow><TableCell colSpan={header.length + colSpanVariant + 1} align='center'>No hay registros</TableCell></TableRow>}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

TableComponent.propTypes = {
    header: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(object).isRequired,
    options: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOf([null])
    ]),
};


export default TableComponent;