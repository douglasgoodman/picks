import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTitle } from '../hooks/useTitle';
import { Link } from '@tanstack/react-router';
import { api } from '../api/api';
import { useAsync } from 'react-async-hook';
import { Skeleton } from '@mui/material';

export const LeagueHome: React.FC = () => {
    useTitle('League Home');

    const getLeaguesCallback = useAsync(api.league.get, []);

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
                        {getLeaguesCallback.loading ? (
                            <>
                                <li>
                                    <Skeleton />
                                </li>
                                <li>
                                    <Skeleton />
                                </li>
                                <li>
                                    <Skeleton />
                                </li>
                            </>
                        ) : getLeaguesCallback.result?.leagues?.length ? (
                            getLeaguesCallback.result?.leagues.map((league) => (
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
