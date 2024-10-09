import { Box, Typography } from "@mui/material";
import { useStyles } from "../utils/style";

function CardIcon({ Icon = null, bg = 'initial', title, children }) {

    const flex = useStyles()

    return (
        <Box className={flex.content} p={1} gap={1} borderRadius={3} bgcolor={bg} color={'white'}>
            {Icon && <Box display={'flex'} alignItems={'center'}><Icon marginY={'auto'} /></Box>}

            <Box display={'flex'} flexDirection={'column'}>
                <Typography fontWeight={'normal'}>{title}</Typography>
                <Typography fontSize={'medium'}>
                    {children}
                </Typography>
            </Box>
        </Box>
    );
}

export default CardIcon;