import { PropsWithChildren } from 'react';
import { LeaguesContext } from './LeaguesContext';
import { useAsync } from 'react-async-hook';
import { api } from '../api/api';
import { LoadingOverlay } from '../components/LoadingOverlay';

export const LeaguesContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const getLeaguesCallback = useAsync(api.league.get, []);

    if (getLeaguesCallback.error) {
        return <div>Error: {getLeaguesCallback.error?.message}</div>;
    }

    return (
        <LoadingOverlay
            isLoading={
                getLeaguesCallback.loading ||
                getLeaguesCallback.status === 'not-requested'
            }
            content="Loading leagues..."
        >
            {getLeaguesCallback.result && (
                <LeaguesContext
                    value={{ leagues: getLeaguesCallback.result.leagues }}
                >
                    {children}
                </LeaguesContext>
            )}
        </LoadingOverlay>
    );
};
