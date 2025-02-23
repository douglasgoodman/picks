import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTitle } from '../hooks/useTitle';
import { Link } from '@tanstack/react-router';
import { useLeaguesContext } from '../context/LeaguesContext';

export const LeagueHome: React.FC = () => {
    useTitle('League Home');

    const { leagues } = useLeaguesContext();

    return (
        <Container>
            <Typography variant="h5">League Home!</Typography>
            <ul>
                <li>
                    <Link to="/league/create">Create a league</Link>
                </li>
                <li>
                    <Link to="/league/join">Join a league</Link>
                </li>
                <li>
                    Go to a league
                    <ul>
                        {leagues?.length ? (
                            leagues.map((league) => (
                                <li key={league.id}>
                                    <Link
                                        to="/league/$leagueId"
                                        params={{ leagueId: league.id }}
                                    >
                                        {league.name}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <>No leagues yet, create or join one!</>
                        )}
                    </ul>
                </li>
            </ul>
        </Container>
    );
};
