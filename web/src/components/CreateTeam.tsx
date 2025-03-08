import React, { PropsWithChildren, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useAsyncCallback } from 'react-async-hook';
import { api } from '../api/api';
import axios from 'axios';
import Alert from '@mui/material/Alert';

export interface Props extends PropsWithChildren {
    leagueId: string;
    userId: string;
    onSuccess: () => void;
}

export const CreateTeam: React.FC<Props> = ({
    leagueId,
    userId,
    onSuccess,
}) => {
    const [teamName, setTeamName] = useState<string>();
    const [alertText, setAlertText] = useState<string>();

    const createTeamCallback = useAsyncCallback(api.team.create, {
        onSuccess,
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.status === 409) {
                    setAlertText(
                        'This team name is already taken. Choose another.',
                    );
                }
            }
        },
    });

    return (
        <Container
            component="form"
            maxWidth="sm"
            onSubmit={(event) => {
                event.preventDefault();
                createTeamCallback.execute(userId, leagueId, teamName!);
            }}
        >
            <Stack spacing={2}>
                <Typography variant="h5">
                    <Box sx={{ textAlign: 'center' }}>
                        Let's set up your team! Start by choosing a name.
                    </Box>
                </Typography>
                <TextField
                    variant="filled"
                    value={teamName || ''}
                    onChange={({ target: { value } }) => setTeamName(value)}
                    error={teamName === ''}
                    label="Team name"
                    helperText="Required"
                    disabled={createTeamCallback.loading}
                    required
                />
                <Button
                    type="submit"
                    loading={createTeamCallback.loading}
                    variant="contained"
                    disabled={!teamName}
                >
                    Create
                </Button>
                {alertText && <Alert severity="error">{alertText}</Alert>}
            </Stack>
        </Container>
    );
};
