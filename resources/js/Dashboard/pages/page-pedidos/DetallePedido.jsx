import { useEffect, useState } from "react";
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


function DetallePedido({ form, model = null, disabled }) {

    const detalle_pedido = useHttp({ url: "/detalle_pedido" });
    const productos = useHttp({ url: "/productos" });

    const [table, setTable] = useState([]);
    const [panel, setPanel] = useState(panelInitial);

    const verifyTable = ({ id }) => table.some(prev => prev.id == id);

    const saveTable = (value, counded) => {
        try {
            if (value.Stock < 1) throw new Error("Actualmente no tenemos stock de este producto.");
            if (counded > value.Stock) throw new Error("No hay suficiente stock para esa cantidad.");
            if (verifyTable(value)) throw new Error("Este producto ya esta agregado");

            setTable(prev => [...prev, {
                id: value.id,
                PrecioUnitario: Number(value.Precio).toFixed(2) ?? 0,
                Total: counded * (Number(value.Precio).toFixed(2) ?? 0),
                Cantidad: counded,
                get_producto: value
            }])
        } catch (error) {
            toast.error(`${error.message}`);
        }
    }

    useEffect(() => {
        setPanel(calcPanel(table, panelInitial));
    }, [table]);

    useEffect(() => {

        model?.response ? detalle_pedido.startHttp({ url: `/detalle_pedido/${model.response.id}` })
            : detalle_pedido.setData([]);

    }, [model]);

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

            <FormPedido disabled={disabled} panel={panel} state={model} />

            <TitleSection title={"Productos"}>
                {disabled == false &&
                    <BuscarProducto
                        data={productos}
                        onSelected={saveTable} />
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

