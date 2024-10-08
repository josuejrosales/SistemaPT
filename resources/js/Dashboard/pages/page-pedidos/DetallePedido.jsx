import { useEffect, useReducer, useRef, useState } from "react";
import FormPedido from "../../forms/form-pedido";
import TitleSection from "../../components/TitleSection";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MaskTable from "../../components/MaskTable";
import useHttp from "../../hooks/useHttp";
import LOAD from "../../global/load";
import TableComponent from "../../components/TableComponent";
import { DetallePedido as DP } from "../../class/DetalleProducto";
import BuscarProducto from "../page-productos/BuscarProducto";
import toast from "react-hot-toast";
import { convertToDecimal } from "../../utils/number";

const panelInitial = { SubTotal: 0.0, Impuesto: 0.0, Total: 0.0 };

function setFormDataDispatch(state, action) {
    return { ...state, ...action };
}
function calcPanel(base, initial) {
    return base.reduce((acum, cell) => {
        const p = convertToDecimal(cell.PrecioUnitario) * convertToDecimal(cell.Cantidad);
        const igv = p * 0.18
        acum.Impuesto += igv
        acum.SubTotal += p
        acum.Total += p + igv
        return acum;
    }, { ...initial })
}


const formDataInitial = {};

function DetallePedido({ form, data = null, disabled }) {

    const detalle_pedido = useHttp({ url: "/detalle_pedido" });
    const productos = useHttp({ url: "/productos" });
    const [table, setTable] = useState([]);
    const [panel, setPanel] = useState(panelInitial);
    const [formData, setFormData] = useReducer(setFormDataDispatch, formDataInitial);

    useEffect(() => {
        setPanel(calcPanel(table, panelInitial));
    }, [table]);

    useEffect(() => {
        data ? detalle_pedido.startHttp({ url: `/detalle_pedido/${data.id}` })
            : detalle_pedido.setData([]);
    }, [data]);

    useEffect(() => {
        detalle_pedido.response && setTable(detalle_pedido.response);
    }, [detalle_pedido.response]);


    useEffect(() => {
        productos.startHttp()
    }, []);

    return (
        <Box component={'form'} ref={form} display={'flex'} gap={2} flexDirection={'column'}>

            <input type="hidden"
                name="table-producto"
                value={JSON.stringify(table.map(item => ({ id: item.id, cound: item.Cantidad, price: item.PrecioUnitario })))} />

            <FormPedido disabled={disabled} panel={panel} data={data} state={formData} dispatch={setFormData} />

            <TitleSection title={"Productos"}>
                {disabled == false &&
                    <BuscarProducto
                        data={productos}
                        onSelected={(value, counded) => {
                            if (value.Stock < 1) toast.error("Actualmente no tenemos stock de este producto.");
                            else {
                                setTable(prev => [...prev, {
                                    id: value.id,
                                    PrecioUnitario: Number(value.Precio).toFixed(2) ?? 0,
                                    Total: counded * (Number(value.Precio).toFixed(2) ?? 0),
                                    Cantidad: counded,
                                    get_producto: value
                                }])
                            }
                        }} />
                }
            </TitleSection>

            {detalle_pedido.loading == LOAD.complete ?
                <TableComponent
                    data={table}
                    header={DP.getFillable()}
                    colSpanVariant={1}
                    disabled={disabled}
                    options={(selected) =>
                        <IconButton sx={{ color: "#d32f2f" }} variant='contained' onClick={() => {
                            setTable(prev => prev.filter(x => x.id != selected.id));
                        }}><DeleteIcon /></IconButton>} />

                : <MaskTable numColumns={DP.getFillable().length} />}
        </Box >
    );
}

export default DetallePedido;

