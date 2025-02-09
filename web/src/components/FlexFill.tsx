import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { type PropsWithChildren } from 'react';

export type FlexFillProps = PropsWithChildren & {
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
