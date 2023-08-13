import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export function useIsMobileUi() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    return {
        isMobileUi: !matches,
    };
}
