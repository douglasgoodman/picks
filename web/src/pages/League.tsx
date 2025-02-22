//import { FlexFill } from '../components/FlexFill';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTitle } from '../hooks/useTitle';
import { useParams } from '@tanstack/react-router';
import { useAsync } from 'react-async-hook';
import { api } from '../api/api';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

export const League: React.FC = () => {
    const leagueId = useParams({
        from: '/league_/$leagueId',
        select: (params) => params.leagueId,
    });

    const getLeagueCallback = useAsync(api.league.get, [leagueId]);

    useTitle(getLeagueCallback.result?.leagues[0]?.name);

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
                    Members:
                    <ul>
                        {league.members.map((member) => (
                            <li key={member.id}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                    }}
                                >
                                    <Avatar
                                        alt={member.fullName}
                                        src={member.userImageUrl}
                                    >
                                        {`${member.firstName[0]}${member.lastName[0]}`}
                                    </Avatar>
                                    {member.fullName}
                                </Box>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </Container>
    );
};
