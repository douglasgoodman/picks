import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { useAuthContext } from '../context/AuthContext';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useAsyncCallback } from 'react-async-hook';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useTitle } from '../hooks/useTitle';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { api } from '../api/api';

export const JoinLeague: React.FC = () => {
    useTitle('Join a league');
    const { user, inProgress: authInProgress } = useAuthContext();
    const [leagueId, setLeagueId] = useState<string>();
    const [alertText, setAlertText] = useState<string>();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();

    const joinLeagueCallback = useAsyncCallback(api.league.join, {
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.status === 404) {
                    setAlertText('League not found');
                } else if (error.status === 409) {
                    setAlertText(
                        'You are already a member of this league, redirecting...',
                    );
                    setShouldRedirect(true);
                } else {
                    setAlertText('An error occurred');
                }
            } else {
                throw error;
            }
        },
        onSuccess: () => {
            setShouldRedirect(true);
        },
    });

    useEffect(() => {
        if (shouldRedirect && leagueId) {
            setTimeout(
                () =>
                    navigate({
                        to: '/league/$leagueId',
                        params: { leagueId: leagueId },
                    }),
                3000,
            );
        }
    }, [shouldRedirect, leagueId, navigate]);

    return (
        <Container sx={{ padding: '2rem' }}>
            <LoadingOverlay isLoading={!!authInProgress}>
                {user ? (
                    <Container component="form" maxWidth="sm">
                        <Stack spacing={2}>
                            <Typography variant="h5">
                                <Box sx={{ textAlign: 'center' }}>
                                    Let's join a league!
                                </Box>
                            </Typography>
                            <TextField
                                variant="filled"
                                value={leagueId || ''}
                                onChange={({ target: { value } }) =>
                                    setLeagueId(value)
                                }
                                error={leagueId === ''}
                                label="League ID"
                                helperText="Required"
                                disabled={joinLeagueCallback.loading}
                                required
                            />
                            <Button
                                loading={joinLeagueCallback.loading}
                                variant="contained"
                                disabled={!leagueId}
                                onClick={() =>
                                    joinLeagueCallback.execute(leagueId!)
                                }
                            >
                                Join
                            </Button>
                            {alertText && (
                                <Alert severity="error">{alertText}</Alert>
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
