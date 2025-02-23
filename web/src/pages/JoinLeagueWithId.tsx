import Container from '@mui/material/Container';
import { useTitle } from '../hooks/useTitle';
import { useLeagueContext } from '../context/LeagueContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useJoinLeague } from '../hooks/useJoinLeague';
import Alert from '@mui/material/Alert';

export const JoinLeagueWithId: React.FC = () => {
    const { league } = useLeagueContext();
    useTitle(`Join ${league.name}`);

    const joinLeague = useJoinLeague(league.id);

    return (
        <Container sx={{ padding: '2rem' }}>
            <Container component="form" maxWidth="sm">
                <Stack spacing={2}>
                    <Typography variant="h5">
                        <Box sx={{ textAlign: 'center' }}>
                            Do you want to join {league.name}?
                        </Box>
                    </Typography>
                    <Button
                        loading={joinLeague.loading}
                        variant="contained"
                        onClick={joinLeague.join}
                    >
                        Join
                    </Button>
                    {joinLeague.alertText && (
                        <Alert severity="error">{joinLeague.alertText}</Alert>
                    )}
                </Stack>
            </Container>
        </Container>
    );
};
