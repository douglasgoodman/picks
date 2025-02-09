import Container from '@mui/material/Container';
import { useTitle } from '../hooks/useTitle';
import { useParams } from '@tanstack/react-router';

export const JoinLeagueWithId: React.FC = () => {
    useTitle('Join a league');

    const leagueId = useParams({
        from: '/league_/$leagueId_/join',
        select: (params) => params.leagueId,
    });

    if (leagueId) {
        return <Container>Let's join league {leagueId}</Container>;
    }
};
