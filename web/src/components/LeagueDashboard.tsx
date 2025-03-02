import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useLeagueContext } from '../context/LeagueContext';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from '@tanstack/react-router';
import Tooltip from '@mui/material/Tooltip';

export const LeagueDashboard: React.FC = () => {
    const { league } = useLeagueContext();

    return (
        <Container sx={{ padding: '2rem' }} component={Paper}>
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
            <ul>
                <li>ID: {league.id}</li>
                <li>Max number of teams: {league.configuration.maxTeams}</li>
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
                <li>
                    Teams:
                    <ul>
                        {league.teams.map((team) => (
                            <li key={team.userId}>{team.name}</li>
                        ))}
                    </ul>
                </li>
            </ul>
        </Container>
    );
};
