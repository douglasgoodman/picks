import React from 'react';
import { useParams } from 'react-router-dom';
import { FlexFill } from '../components/FlexFill';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTitle } from '../hooks/useTitle';

export const JoinLeague: React.FC = () => {
    useTitle('Join a league');
    const { id } = useParams<'id'>();

    if (!!id) {
        return <Container>Let's join league {id}</Container>;
    }
    return (
        <Container>
            <Typography variant="h5">League stuff!</Typography>
        </Container>
    );
};
