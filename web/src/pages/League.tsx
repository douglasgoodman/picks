import React from 'react';
import { useParams } from 'react-router-dom';
import { FlexFill } from '../components/FlexFill';
import Container from '@mui/material/Container';
import { useAuthContext } from '../context/AuthContext';
import { create } from 'domain';
import Typography from '@mui/material/Typography';
import { useTitle } from '../hooks/useTitle';

export interface LeagueProps {
    join?: boolean;
    create?: boolean;
}

export const League: React.FC<LeagueProps> = ({ join, create }) => {
    const { id } = useParams<'id'>();
    useTitle('League stuff');

    if (create) {
        return (
            <Container sx={{ padding: '2rem' }}>
                <FlexFill
                    sx={{ flexDirection: 'column', alignItems: 'center' }}
                >
                    <Typography variant="h5">
                        Let's create a new league!
                    </Typography>
                    <Typography></Typography>
                </FlexFill>
            </Container>
        );
    }
    if (join) {
    }
    if (join && !!id) {
        return <Container></Container>;
    }
    return (
        <Container>
            <Typography variant="h5">League stuff!</Typography>
        </Container>
    );
};
