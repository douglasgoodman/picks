import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useTitle } from '../hooks/useTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useJoinLeague } from '../hooks/useJoinLeague';
import Paper from '@mui/material/Paper';

export const JoinLeague: React.FC = () => {
    useTitle('Join a league');
    const [leagueId, setLeagueId] = useState<string>();
    const joinLeague = useJoinLeague(leagueId);

    return (
        <Container sx={{ padding: '5rem' }} component={Paper}>
            <Box display="flex" component="form" justifyContent="center">
                <Stack spacing={2} minWidth="50%">
                    <Typography variant="h5">
                        <Box sx={{ textAlign: 'center' }}>
                            Let's join a league!
                        </Box>
                    </Typography>
                    <TextField
                        variant="filled"
                        value={leagueId || ''}
                        onChange={({ target: { value } }) => setLeagueId(value)}
                        error={leagueId === ''}
                        label="League ID"
                        helperText="Required"
                        disabled={joinLeague.loading}
                        required
                    />
                    <Button
                        loading={joinLeague.loading}
                        variant="contained"
                        disabled={!leagueId}
                        onClick={joinLeague.join}
                    >
                        Join
                    </Button>
                    {joinLeague.alertText && (
                        <Alert severity="error">{joinLeague.alertText}</Alert>
                    )}
                </Stack>
            </Box>
        </Container>
    );
};
