import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useLeagueContext } from '../context/LeagueContext';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from '@tanstack/react-router';
import Tooltip from '@mui/material/Tooltip';
import { ScheduleView } from './ScheduleView';
import { ScheduleContextProvider } from '../context/ScheduleContextProvider';
import { PicksContextProvider } from '../context/PicksContextProvider';

export const LeagueDashboard: React.FC = () => {
    const { league } = useLeagueContext();

    return (
        <Container sx={{ padding: '2rem' }} component={Paper}>
            <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h5">{league.name}</Typography>
                    <Tooltip title="League settings">
                        <Link
                            to="/league/$leagueId/settings"
                            params={{ leagueId: league.id }}
                        >
                            <SettingsIcon />
                        </Link>
                    </Tooltip>
                </Stack>
                <ScheduleContextProvider leagueId={league.id}>
                    <PicksContextProvider leagueId={league.id}>
                        <ScheduleView />
                    </PicksContextProvider>
                </ScheduleContextProvider>
            </Stack>
        </Container>
    );
};
