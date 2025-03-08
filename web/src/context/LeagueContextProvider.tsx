import { PropsWithChildren } from 'react';
import { LeagueContext } from './LeagueContext';
import { useAsync } from 'react-async-hook';
import { api } from '../api/api';
import { LoadingOverlay } from '../components/LoadingOverlay';
import Container from '@mui/material/Container';
import { isAxiosError } from 'axios';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface Props extends PropsWithChildren {
    leagueId: string;
    getNameOnly?: boolean;
}

export const LeagueContextProvider: React.FC<Props> = ({
    leagueId,
    getNameOnly,
    children,
}) => {
    const getLeagueCallback = useAsync(api.league.get, [leagueId, getNameOnly]);

    if (getLeagueCallback.error) {
        let errorMessage = '';
        if (isAxiosError(getLeagueCallback.error)) {
            if (getLeagueCallback.error.status === 404) {
                errorMessage = 'That league could not be found!';
            }
        }
        return (
            <Container sx={{ padding: '5rem' }} component={Paper}>
                <Typography variant="h5">Error: {errorMessage}</Typography>
            </Container>
        );
    }

    return (
        <LoadingOverlay
            isLoading={
                getLeagueCallback.loading ||
                getLeagueCallback.status === 'not-requested'
            }
            content="Loading league..."
        >
            {getLeagueCallback.result && (
                <LeagueContext
                    value={{
                        league: getLeagueCallback.result.league,
                        refresh: () => getLeagueCallback.execute(leagueId),
                    }}
                >
                    {children}
                </LeagueContext>
            )}
        </LoadingOverlay>
    );
};
