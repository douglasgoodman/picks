import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTitle } from '../hooks/useTitle';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { useLeagueContext } from '../context/LeagueContext';
import { useAuthContext } from '../context/AuthContext';
import { LoadingOverlay } from '../components/LoadingOverlay';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { api } from '../api/api';
import Button from '@mui/material/Button';

export const League: React.FC = () => {
    const { league, refresh } = useLeagueContext();
    const { user, inProgress } = useAuthContext();
    const [teamName, setTeamName] = useState<string>();
    useTitle(league.name);

    const createTeamCallback = useAsyncCallback(api.team.create, {
        onSuccess: refresh,
    });

    if (
        !league.teams.length ||
        !league.teams.find((t) => t.userId === user?.id)
    ) {
        return (
            <Container sx={{ padding: '2rem' }}>
                <LoadingOverlay isLoading={!!inProgress}>
                    {user ? (
                        <Container component="form" maxWidth="sm">
                            <Stack spacing={2}>
                                <Typography variant="h5">
                                    <Box sx={{ textAlign: 'center' }}>
                                        Let's set up your team! Start by
                                        choosing a name.
                                    </Box>
                                </Typography>
                                <TextField
                                    variant="filled"
                                    value={teamName || ''}
                                    onChange={({ target: { value } }) =>
                                        setTeamName(value)
                                    }
                                    error={teamName === ''}
                                    label="Team name"
                                    helperText="Required"
                                    disabled={createTeamCallback.loading}
                                    required
                                />
                                <Button
                                    loading={createTeamCallback.loading}
                                    variant="contained"
                                    disabled={!teamName}
                                    onClick={() =>
                                        createTeamCallback.execute(
                                            user.id,
                                            league.id,
                                            teamName!,
                                        )
                                    }
                                >
                                    Create
                                </Button>
                            </Stack>
                        </Container>
                    ) : (
                        <Typography>Sign in first</Typography>
                    )}
                </LoadingOverlay>
            </Container>
        );
    }

    return (
        <>
            <Container sx={{ padding: '2rem' }}>
                <Typography variant="h5">{league.name}</Typography>
                <ul>
                    <li>ID: {league.id}</li>
                    <li>Max number of teams: {league.maxTeams}</li>
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
        </>
    );
};
