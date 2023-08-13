import React from 'react';
import { FlexFill } from '../components/FlexFill';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { useAuthContext } from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useAsyncCallback } from 'react-async-hook';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { environment } from '../environment';
import Alert from '@mui/material/Alert';
import FormHelperText from '@mui/material/FormHelperText';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { toCanvas } from 'qrcode';
import Box from '@mui/material/Box';
import { LeagueRoute } from '@picks/api-sdk';
import { useTitle } from '../hooks/useTitle';

export interface LeagueProps {
    join?: boolean;
    create?: boolean;
}

const maxPlayerPossibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: environment.apiDomain,
});

export const CreateLeague: React.FC = () => {
    useTitle('Create a league');
    const { user, inProgress: authInProgress } = useAuthContext();
    const [leagueName, setLeagueName] = React.useState<string | undefined>(
        undefined
    );
    const [maxPlayers, setMaxPlayers] = React.useState<number>(5);
    const [leagueUrl, setLeagueUrl] = React.useState<string | undefined>(
        undefined
    );
    const [copied, setCopied] = React.useState(false);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const {
        loading,
        execute: createLeague,
        error,
    } = useAsyncCallback(async () => {
        const response = await axiosInstance.post(LeagueRoute.create, {
            leagueName,
            maxPlayers,
        });
        setLeagueUrl(
            `${environment.webDomain}${LeagueRoute.join}/${response.data.id}`
        );
    });

    React.useEffect(() => {
        if (!(canvasRef.current && leagueUrl)) {
            return;
        }
        toCanvas(canvasRef.current, leagueUrl, { width: 280 });
    }, [canvasRef, leagueUrl]);

    const handleCreateButtonClick = async () => {
        await createLeague();
    };

    const handleCopyToClipboard = () => {
        if (!leagueUrl) {
            return;
        }
        navigator.clipboard.writeText(leagueUrl);
        setCopied(true);
    };

    if (!!leagueUrl) {
        return (
            <Container sx={{ padding: '2rem' }}>
                <Container component="form" maxWidth="sm">
                    <Stack spacing={2}>
                        <Typography variant="h5">
                            <Box sx={{ textAlign: 'center' }}>
                                League created!
                            </Box>
                        </Typography>
                        <Typography component="div">
                            <Box sx={{ textAlign: 'center' }}>
                                This link will allow new members to join your
                                team!
                            </Box>
                        </Typography>
                        <FilledInput
                            hiddenLabel
                            defaultValue={leagueUrl}
                            title={leagueUrl}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Tooltip
                                        title={
                                            copied
                                                ? 'Copied!'
                                                : 'Copy link to clipboard'
                                        }
                                    >
                                        <IconButton
                                            onClick={handleCopyToClipboard}
                                        >
                                            {copied ? (
                                                <CheckIcon />
                                            ) : (
                                                <ContentCopyIcon />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                </InputAdornment>
                            }
                        />
                        <Box sx={{ textAlign: 'center' }}>
                            <canvas width={280} height={280} ref={canvasRef} />
                        </Box>
                    </Stack>
                </Container>
            </Container>
        );
    }

    return (
        <Container sx={{ padding: '2rem' }}>
            <LoadingOverlay isLoading={!!authInProgress}>
                {!!user ? (
                    <Container component="form" maxWidth="sm">
                        <Stack spacing={2}>
                            <Typography variant="h5">
                                <Box sx={{ textAlign: 'center' }}>
                                    Let's create a new league!
                                </Box>
                            </Typography>
                            <TextField
                                variant="filled"
                                value={leagueName || ''}
                                onChange={({ target: { value } }) =>
                                    setLeagueName(value)
                                }
                                error={leagueName === ''}
                                label="League name"
                                helperText="Required"
                                disabled={loading}
                                required
                            />
                            <FormControl variant="filled" required>
                                <InputLabel id="max-players-label">
                                    Max number of players
                                </InputLabel>
                                <Select<number>
                                    disabled={loading}
                                    labelId="max-players-label"
                                    id="max-players"
                                    value={maxPlayers}
                                    onChange={({ target: { value } }) =>
                                        setMaxPlayers(value as number)
                                    }
                                >
                                    {maxPlayerPossibleValues.map((value) => (
                                        <MenuItem key={value} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                            <LoadingButton
                                loading={loading}
                                variant="contained"
                                disabled={!leagueName}
                                onClick={handleCreateButtonClick}
                            >
                                Create
                            </LoadingButton>
                            {!!error && (
                                <Alert severity="error">
                                    We were unable to create a league!
                                </Alert>
                            )}
                        </Stack>
                    </Container>
                ) : (
                    <Typography>Sign in first</Typography>
                )}
                <Typography></Typography>
            </LoadingOverlay>
        </Container>
    );
};
