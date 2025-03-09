import SettingsIcon from '@mui/icons-material/Settings';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';
import { useLeagueContext } from '../context/LeagueContext';
import { PicksContextProvider } from '../context/PicksContextProvider';
import { ScheduleContextProvider } from '../context/ScheduleContextProvider';
import { ScheduleView } from './ScheduleView';

export const LeagueDashboard: React.FC = () => {
    const { league } = useLeagueContext();

    return (
        <Container sx={{ padding: '2rem' }} component={Paper}>
            <Stack spacing={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Breadcrumbs>
                        <Link to="/">My Leagues</Link>
                        <Typography>{league.name}</Typography>
                    </Breadcrumbs>
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
