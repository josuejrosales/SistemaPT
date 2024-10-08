import { Card, CardContent, CardMedia, Grid2 } from "@mui/material";
import { BASE_IMG, IMG_DEFAULT } from "../config/app";

function CardComponent({ imgUrl = null, children }) {

    return (
        <Card sx={{ display: 'flex', maxWidth: 500, minHeight: 100 }}>
            <Grid2 container>
                <Grid2 xs={4}>
                    <CardMedia
                        component="img"
                        sx={{ maxHeight: 150 }}
                        image={(imgUrl ?? "").trim() == "" ? IMG_DEFAULT : `${BASE_IMG}/${imgUrl}`}
                        alt="Imagen de ejemplo"
                    />
                </Grid2>

                <Grid2 xs={8}>
                    <CardContent>
                        {children}
                    </CardContent>
                </Grid2>
            </Grid2>
        </Card>
    );
}

export default CardComponent;