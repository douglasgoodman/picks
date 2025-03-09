import { Header } from './components/Header';
import {
    createTheme,
    CssBaseline,
    PaletteMode,
    ThemeProvider,
    useMediaQuery,
} from '@mui/material';
import { useLocalStorage } from './hooks/useLocalStorage';
import { type PropsWithChildren, StrictMode, useMemo, useState } from 'react';

export const App: React.FC<PropsWithChildren> = ({ children }) => {
    const localStorage = useLocalStorage();
    const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [paletteMode, setPaletteMode] = useState<PaletteMode>(() => {
        const mode = localStorage.get<string>('paletteMode') as PaletteMode;
        if (mode) {
            return mode;
        } else {
            return preferDarkMode ? 'dark' : 'light';
        }
    });

    const theme = useMemo(
        () =>
            createTheme({
                palette: { mode: paletteMode },
            }),
        [paletteMode],
    );

    const togglePaletteMode = () => {
        const mode = paletteMode === 'dark' ? 'light' : 'dark';
        setPaletteMode(mode);
        localStorage.set<string>('paletteMode', mode);
    };

    return (
        <StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme>
                    <Header
                        paletteMode={paletteMode}
                        togglePaletteMode={togglePaletteMode}
                    />
                    {children}
                </CssBaseline>
            </ThemeProvider>
        </StrictMode>
    );
};
