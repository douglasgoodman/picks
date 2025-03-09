import Container from '@mui/material/Container';
import { useTitle } from '../hooks/useTitle';
import { useLeagueContext } from '../context/LeagueContext';
import { useAuthContext } from '../context/AuthContext';
import { CreateTeam } from '../components/CreateTeam';
import { LeagueDashboard } from '../components/LeagueDashboard';

export const League: React.FC = () => {
    const { league, refresh } = useLeagueContext();
    const { user } = useAuthContext();
    useTitle(league.name);

    if (
        !league.teams.length ||
        !league.teams.find((t) => t.userId === user.id)
    ) {
        return (
            <Container sx={{ padding: '2rem' }}>
                <CreateTeam
                    leagueId={league.id}
                    userId={user.id}
                    onSuccess={refresh}
                />
            </Container>
        );
    }

    return <LeagueDashboard />;
};
