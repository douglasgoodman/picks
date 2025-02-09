import Google from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../context/AuthContext';
import { FlexFill } from '../components/FlexFill';
import Container from '@mui/material/Container';
import { useTitle } from '../hooks/useTitle';
import Button from '@mui/material/Button';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const SignIn: React.FC = () => {
    const { user, signIn } = useAuthContext();
    const [inProgress, setInProgress] = useState(false);
    const navigate = useNavigate();

    useTitle('Sign in');

    const handleSignInClick = () => {
        setInProgress(true);
        signIn();
    };

    if (!!user) {
        navigate({ to: '/' });
    }

    return (
        <Container>
            <FlexFill
                sx={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography>
                    Show me your Picks uses your Google account for sign in.
                </Typography>
                <Button
                    loading={inProgress}
                    variant="contained"
                    startIcon={<Google />}
                    onClick={handleSignInClick}
                >
                    Sign in with Google
                </Button>
            </FlexFill>
        </Container>
    );
};
