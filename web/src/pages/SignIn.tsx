import React from 'react';
import Google from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAuthContext } from '../context/AuthContext';
import { FlexFill } from '../components/FlexFill';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useTitle } from '../hooks/useTitle';

export const SignIn: React.FC = () => {
    const { user, signIn } = useAuthContext();
    const [inProgress, setInProgress] = React.useState(false);
    const navigate = useNavigate();

    useTitle('Sign in');

    const handleSignInClick = () => {
        setInProgress(true);
        signIn();
    };

    if (!!user) {
        navigate('/');
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
                <LoadingButton
                    loading={inProgress}
                    variant="contained"
                    startIcon={<Google />}
                    onClick={handleSignInClick}
                >
                    Sign in with Google
                </LoadingButton>
            </FlexFill>
        </Container>
    );
};
