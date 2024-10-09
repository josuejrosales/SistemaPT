import { Box, Skeleton, Stack } from "@mui/material";

function MaskCard({ count = 1, height = 300, direction = "row" }) {
    return (
        <Stack spacing={1} width={'100%'}>
            <Box display={'flex'} gap={1} flexDirection={direction}>
                {Array(count).fill(0).map((_, i) =>
                    <Box key={i} flexGrow={1} width={'auto'}>
                        <Skeleton variant="rounded" height={height} />
                    </Box>
                )}
            </Box>
        </Stack>
    );
}

export default MaskCard;