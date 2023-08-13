import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { HasChildren } from '../types';

export type FlexFillProps = HasChildren & {
    sx?: SxProps<Theme>;
};

export const FlexFill: React.FC<FlexFillProps> = ({ sx, children }) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};
