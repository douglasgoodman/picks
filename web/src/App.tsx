import React from 'react';
import { Router } from './routes/Router';
import { Header } from './components/Header';
import { AuthContextProvider } from './context/AuthContextProvider';
import {
    createTheme,
    CssBaseline,
    PaletteMode,
    ThemeProvider,
    useMediaQuery,
} from '@mui/material';
import { useLocalStorage } from './hooks/useLocalStorage';
import { LoadingOverlay } from './components/LoadingOverlay';

export const App: React.FC = () => {
    const localStorage = useLocalStorage();
    const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [paletteMode, setPaletteMode] = React.useState<PaletteMode>(() => {
        const mode = localStorage.get<string>('paletteMode') as PaletteMode;
        if (!!mode) {
            return mode;
        } else {
            return preferDarkMode ? 'dark' : 'light';
        }
    });

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: { mode: paletteMode },
            }),
        [paletteMode]
    );

    const togglePaletteMode = () => {
        const mode = paletteMode === 'dark' ? 'light' : 'dark';
        setPaletteMode(mode);
        localStorage.set<string>('paletteMode', mode);
    };

    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme>
                    <AuthContextProvider>
                        <Router>
                            <Header
                                paletteMode={paletteMode}
                                togglePaletteMode={togglePaletteMode}
                            />
                        </Router>
                    </AuthContextProvider>
                </CssBaseline>
            </ThemeProvider>
        </React.StrictMode>
    );
};
