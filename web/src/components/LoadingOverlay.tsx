import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { type PropsWithChildren } from 'react';
import { FlexFill } from './FlexFill';

export type LoadingOverlayProps = PropsWithChildren & {
    isLoading: boolean;
    content?: string;
};

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    isLoading,
    content,
    children,
}) => {
    if (!isLoading) {
        return <>{children}</>;
    }

    return (
        <FlexFill
            sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}
        >
            <CircularProgress />
            <Typography>{content ?? 'Please wait...'}</Typography>
        </FlexFill>
    );
};
