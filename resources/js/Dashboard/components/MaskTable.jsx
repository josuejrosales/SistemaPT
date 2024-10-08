
import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box, Grid2 } from '@mui/material';

export default function MaskTable({ numColumns = 1 }) {
    return (
        <Stack spacing={1}>
            <Box display={'flex'} gap={1}>
                {Array(numColumns).fill(0).map((_, i) =>
                    <Box key={i} flexGrow={1} width={'auto'}>
                        <Skeleton variant="rounded" height={50} />
                    </Box>
                )}
            </Box>
            {Array(3).fill(0).map((_, i) =>
                <Skeleton key={i} variant="rounded" width={'100%'} height={50} />
            )}
        </Stack>
    );
}
