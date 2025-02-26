import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTitle } from '../hooks/useTitle';
import { Link } from '@tanstack/react-router';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

export const Home: React.FC = () => {
    useTitle('Home');

    return (
        <Container sx={{ padding: '2rem' }} component={Paper}>
            <Stack spacing={5} justifyContent="center">
                <Typography variant="h3">
                    Welcome to Show me your Picks!!
                </Typography>
                <Typography>
                    Create a league with your friends and pick NFL winners each
                    week!
                </Typography>
                <ButtonGroup>
                    <Button
                        component={Link}
                        variant="contained"
                        to="/league/create"
                    >
                        Create a league
                    </Button>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/league/join"
                    >
                        Join a league
                    </Button>
                    <Button variant="contained" component={Link} to="/league">
                        My leagues
                    </Button>
                </ButtonGroup>
            </Stack>
        </Container>
    );
};
