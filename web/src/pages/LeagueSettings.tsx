import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { useLeagueContext } from '../context/LeagueContext';
import { useAuthContext } from '../context/AuthContext';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const LeagueSettings: React.FC = () => {
    const { league } = useLeagueContext();
    const { inProgress: authInProgress } = useAuthContext();

    return (
        <Container sx={{ padding: '5rem' }} component={Paper}>
            <LoadingOverlay isLoading={!!authInProgress}>
                <Stack>
                    <Typography variant="h4">{`${league.name} Settings`}</Typography>
                </Stack>
            </LoadingOverlay>
        </Container>
    );
};
