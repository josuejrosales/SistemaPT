import { Box, Divider } from "@mui/material";
import ChartComponent from "../../components/ChartComponent";
import useHttp from "../../hooks/useHttp";
import { useEffect, useState } from "react";
import MaskCard from "../../components/MaskCard";
import InfoGeneral from "./InfoGeneral";
import { useStyles } from "../../utils/style";

function Home() {

    const flexStyle = useStyles();

    const reportes = useHttp({ url: "/reportes" });
    const [pedidoXDia, setPeidoXDia] = useState(null);
    const [pedidoXProductoXDia, setPedidoXProductoXDia] = useState(null);


    useEffect(() => {
        const { response } = reportes
        if (response) {
            setPeidoXDia(response.pedidoxdia ?? []);
            setPedidoXProductoXDia(response.pedidoxproductoxdia ?? []);
        }
    }, [reportes]);

    useEffect(() => {
        reportes.startHttp();
    }, []);

    return (
        <Box className={flexStyle.container}>
            <InfoGeneral />
            <Divider />
            {
                pedidoXDia && pedidoXProductoXDia ?
                    <Box className={flexStyle.content}>
                        <Box flex={1}>
                            <ChartComponent
                                bgColor="#f44336"
                                brColor="orange"
                                base={{
                                    title: "Total de pedidos por dia",
                                    label: "Orden",
                                    valueCenter: pedidoXDia.map(x => x.Valor),
                                    valueBottom: pedidoXDia.map(x => `Dia ${x.Clave}`),
                                }}>
                                <ul style={{ my: 0 }}>
                                    {(() => {
                                        const first = pedidoXDia.reduce((max, obj) => (obj.Valor > max.Valor ? obj : max), pedidoXDia[0]);
                                        return <li>{`El día ${first?.Clave ?? 0} tuvo la mayor demanda de pedidos, con un total de ${first?.Valor ?? 0}.`}</li>
                                    })()}

                                </ul>
                            </ChartComponent>
                        </Box>
                        <Box flex={1}>
                            <ChartComponent
                                bgColor="#1976d2"
                                brColor="skyblue"
                                base={{
                                    title: "Productos mas vendidos por dia",
                                    label: "Producto",
                                    valueCenter: pedidoXProductoXDia.map(x => x.Cantidad),
                                    valueBottom: pedidoXProductoXDia.map(x => `Dia ${x.Dia}`),
                                }}>
                                <ul style={{ my: 0 }}>
                                    {pedidoXProductoXDia.map((element, i) =>
                                        <li key={i}>{element.Producto ?? "None"} : {element.Cantidad} registros en el dia {element.Dia ?? 0}</li>
                                    )}
                                </ul>
                            </ChartComponent>
                        </Box>
                    </Box>
                    : <MaskCard count={2} />}
        </Box>
    );

}

export default Home;