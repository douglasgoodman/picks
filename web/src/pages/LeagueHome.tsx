import Container from '@mui/material/Container';
import { useTitle } from '../hooks/useTitle';
import { Link, useNavigate } from '@tanstack/react-router';
import { useLeaguesContext } from '../context/LeaguesContext';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import { getAvatarInitials } from '../components/getAvatarInitials';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export const LeagueHome: React.FC = () => {
    useTitle('League Home');
    const navigate = useNavigate();

    const { leagues } = useLeaguesContext();

    return (
        <Container sx={{ padding: '2rem' }} component={Paper}>
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h4">Your leagues</Typography>
                    <ButtonGroup>
                        <Button component={Link} to="/league/create">
                            Create a league
                        </Button>
                        <Button component={Link} to="/league/join">
                            Join a league
                        </Button>
                    </ButtonGroup>
                </Stack>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Teams</TableCell>
                                <TableCell align="right">Members</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {leagues.map((league) => (
                                <TableRow
                                    key={league.id}
                                    hover
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        navigate({
                                            to: '/league/$leagueId',
                                            params: { leagueId: league.id },
                                        })
                                    }
                                >
                                    <TableCell>
                                        <Typography variant="h6">
                                            {league.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <AvatarGroup>
                                            {league.members.map((m) => (
                                                <Tooltip
                                                    key={m.id}
                                                    title={m.fullName}
                                                >
                                                    <Avatar
                                                        src={m.userImageUrl}
                                                        alt={m.fullName}
                                                    >
                                                        {getAvatarInitials(
                                                            m.firstName,
                                                            m.lastName,
                                                        )}
                                                    </Avatar>
                                                </Tooltip>
                                            ))}
                                        </AvatarGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Container>
    );
};
