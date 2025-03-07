import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useLeagueContext } from '../context/LeagueContext';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTitle } from '../hooks/useTitle';

export const LeagueSettings: React.FC = () => {
    const { league } = useLeagueContext();
    useTitle(`${league.name} Settings`);

    return (
        <Container sx={{ padding: '5rem' }} component={Paper}>
            <Stack>
                <Typography variant="h4">{`${league.name} Settings`}</Typography>
            </Stack>
        </Container>
    );
};
