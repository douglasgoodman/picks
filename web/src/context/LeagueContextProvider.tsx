import { PropsWithChildren } from 'react';
import { LeagueContext } from './LeagueContext';
import { useAsync } from 'react-async-hook';
import { api } from '../api/api';
import { LoadingOverlay } from '../components/LoadingOverlay';

interface Props extends PropsWithChildren {
    leagueId: string;
}

export const LeagueContextProvider: React.FC<Props> = ({
    leagueId,
    children,
}) => {
    const getLeagueCallback = useAsync(api.league.get, [leagueId]);

    if (getLeagueCallback.error) {
        return <div>Error: {getLeagueCallback.error?.message}</div>;
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
