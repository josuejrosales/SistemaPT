import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading({ size = 20 }) {
    return (
        <Box fontSize={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={size} />
        </Box>
    );
}