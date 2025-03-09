import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from '@tanstack/react-router';
import { getAvatarInitials } from '../components/getAvatarInitials';
import { useLeaguesContext } from '../context/LeaguesContext';
import { useTitle } from '../hooks/useTitle';

export const LeagueHome: React.FC = () => {
    useTitle('My Leagues');
    const navigate = useNavigate();

    const { leagues } = useLeaguesContext();

    return (
        <Container sx={{ padding: '2rem' }} component={Paper}>
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                    <Breadcrumbs>
                        <Typography>My Leagues</Typography>
                    </Breadcrumbs>
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
