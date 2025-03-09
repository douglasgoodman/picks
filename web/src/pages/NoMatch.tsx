import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTitle } from '../hooks/useTitle';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Link } from '@tanstack/react-router';

export const NoMatch: React.FC = () => {
    useTitle('Page not found');

    return (
        <Container sx={{ padding: '5rem' }} component={Paper}>
            <Stack sx={{ alignItems: 'center' }} spacing={3}>
                <Typography variant="h2">
                    I can't find that page anywhere!
                </Typography>
                <Link to="/">Go home</Link>
            </Stack>
        </Container>
    );
};
