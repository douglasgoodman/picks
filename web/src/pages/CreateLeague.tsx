import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { useAuthContext } from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import { useAsyncCallback } from 'react-async-hook';
import { environment } from '../environment';
import Alert from '@mui/material/Alert';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { toCanvas } from 'qrcode';
import Box from '@mui/material/Box';
import { useTitle } from '../hooks/useTitle';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
import { api } from '../api/api';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';

const maxTeamsPossibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CreateLeague: React.FC = () => {
    useTitle('Create a league');
    const { user, inProgress: authInProgress } = useAuthContext();
    const [leagueName, setLeagueName] = useState<string>();
    const [maxTeams, setMaxTeams] = useState<number>(4);
    const [leagueUrl, setLeagueUrl] = useState<string>();
    const [copied, setCopied] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const createLeagueCallback = useAsyncCallback(api.league.create, {
        onSuccess: (response) => {
            setLeagueUrl(`${environment.webDomain}/league/${response.id}/join`);
        },
    });

    useEffect(() => {
        if (!(canvasRef.current && leagueUrl)) {
            return;
        }
        toCanvas(canvasRef.current, leagueUrl, { width: 280 });
    }, [canvasRef, leagueUrl]);

    const handleCreateButtonClick = async () => {
        await createLeagueCallback.execute(leagueName!, maxTeams);
    };

    const handleCopyToClipboard = () => {
        if (!leagueUrl) {
            return;
        }
        navigator.clipboard.writeText(leagueUrl);
        setCopied(true);
    };

    if (leagueUrl) {
        return (
            <Container sx={{ padding: '3rem' }} component={Paper}>
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
        <Container sx={{ padding: '5rem' }} component={Paper}>
            <LoadingOverlay isLoading={!!authInProgress}>
                {user ? (
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
                                disabled={createLeagueCallback.loading}
                                required
                            />
                            <Box>
                                <InputLabel>Max number of teams</InputLabel>
                                <Slider
                                    disabled={createLeagueCallback.loading}
                                    id="max-teams"
                                    valueLabelDisplay="auto"
                                    marks={maxTeamsPossibleValues.map((n) => ({
                                        value: n,
                                        label: n,
                                    }))}
                                    step={1}
                                    min={1}
                                    max={10}
                                    defaultValue={4}
                                    value={maxTeams}
                                    onChange={(_, value) =>
                                        setMaxTeams(value as number)
                                    }
                                />
                            </Box>
                            <Button
                                loading={createLeagueCallback.loading}
                                variant="contained"
                                disabled={!leagueName}
                                onClick={handleCreateButtonClick}
                            >
                                Create
                            </Button>
                            {createLeagueCallback.error && (
                                <Alert severity="error">
                                    We were unable to create a league!
                                </Alert>
                            )}
                        </Stack>
                    </Container>
                ) : (
                    <Typography>Sign in first</Typography>
                )}
            </LoadingOverlay>
        </Container>
    );
};
