import Google from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../context/AuthContext';
import Container from '@mui/material/Container';
import { useTitle } from '../hooks/useTitle';
import Button from '@mui/material/Button';
import { useSearch } from '@tanstack/react-router';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { LoadingOverlay } from '../components/LoadingOverlay';

export const SignIn: React.FC = () => {
    const { signIn, inProgress } = useAuthContext();
    const { path } = useSearch({ from: '/signIn' });

    useTitle('Sign in');

    return (
        <LoadingOverlay isLoading={!!inProgress}>
            <Container sx={{ padding: '5rem' }} component={Paper}>
                <Stack sx={{ alignItems: 'center' }} spacing={3}>
                    <Typography>
                        Show me your Picks uses your Google account for sign in.
                    </Typography>
                    <Button
                        loading={inProgress}
                        variant="contained"
                        startIcon={<Google />}
                        onClick={() => signIn(path)}
                    >
                        Sign in with Google
                    </Button>
                </Stack>
            </Container>
        </LoadingOverlay>
    );
};
