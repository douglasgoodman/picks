//import { FlexFill } from '../components/FlexFill';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTitle } from '../hooks/useTitle';
import { useParams } from '@tanstack/react-router';
import { useAsync } from 'react-async-hook';
import { api } from '../api/api';

export const League: React.FC = () => {
    useTitle('League stuff');
    const leagueId = useParams({
        from: '/league_/$leagueId',
        select: (params) => params.leagueId,
    });

    const getLeagueCallback = useAsync(api.league.get, [leagueId]);

    if (getLeagueCallback.loading) {
        return <Container>Loading...</Container>;
    }

    if (getLeagueCallback.error) {
        return <Container>Error: {getLeagueCallback.error.message}</Container>;
    }

    const league = getLeagueCallback.result?.leagues[0];
    if (!league) {
        return <Container>League not found</Container>;
    }
    return (
        <Container>
            <Typography variant="h5">{league.name}</Typography>
            <ul>
                <li>ID: {league.id}</li>
                <li>Max number of players: {league.maxPlayers}</li>
                <li>
                    Members:{' '}
                    <ul>
                        {league.members.map((member) => (
                            <li>{member.fullName}</li>
                        ))}
                    </ul>
                </li>
            </ul>
        </Container>
    );
};
