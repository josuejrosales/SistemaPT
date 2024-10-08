
import FormImage from "../../forms/form-image";
import { Box } from "@mui/material";
import { BASE_IMG } from "../../config/app";

function ChangeImageProducto({ form, data }) {

    return (
        <Box
            ref={form}
            component="form"
            onSubmit={e => e.preventDefault()}
            sx={{ maxWidth: 400, margin: 'auto' }}
            encType="multipart/form-data">

            <FormImage
                name={"producto-image"}
                img={data.Photo ? `${BASE_IMG}/${data.Photo}` : null} />
        </Box>
    );
}

export default ChangeImageProducto;