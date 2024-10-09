import React, {  useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Box, Divider, Typography } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ChartComponent = ({ base = {}, brColor = "inherit", bgColor = 'inherit', children }) => {

    const [dataSet, setDataSet] = useState({
        data: {
            labels: base.valueBottom,
            datasets: [
                {
                    label: base.label ?? "",
                    data: base.valueCenter ?? [],
                    borderColor: brColor,
                    backgroundColor: bgColor,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: base.title ?? "",
                },
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Cantidad'
                    },
                    min: 1,
                    ticks: {
                        stepSize: 1,
                        beginAtZero: true,
                    },
                }
            }
        }
    });

    return (
        <Box display={'flex'} gap={3} flexDirection={'column'}>
            <Line data={dataSet.data} options={dataSet.options} />
            <Divider />
            <Box>
                <Typography fontWeight={'bold'}>Descripcion:</Typography>
                {children}
            </Box>
        </Box>
    )
};

export default ChartComponent;
