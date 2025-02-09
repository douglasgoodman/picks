import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { FlexFill } from '../components/FlexFill';
import Container from '@mui/material/Container';
import { useTitle } from '../hooks/useTitle';
import { Link } from '@tanstack/react-router';

export const Home: React.FC = () => {
    useTitle('Home');

    return (
        <Container>
            <FlexFill
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography>Welcome to Show me your Picks!!</Typography>
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
                    </ButtonGroup>
                </Box>
            </FlexFill>
        </Container>
    );
};
