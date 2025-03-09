import { PropsWithChildren } from 'react';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import { api } from '../api/api';
import { PicksContext } from './PicksContext';

interface Props extends PropsWithChildren {
    leagueId: string;
}

export const PicksContextProvider: React.FC<Props> = ({
    leagueId,
    children,
}) => {
    const getPicksCallback = useAsync(api.picks.get, [leagueId]);

    const createPicksCallback = useAsyncCallback(api.picks.create, {
        onSuccess: () => getPicksCallback.execute(leagueId),
    });

    const updatePickCallback = useAsyncCallback(api.picks.update, {
        onSuccess: () => getPicksCallback.execute(leagueId),
    });

    const deletePickCallback = useAsyncCallback(api.picks.delete, {
        onSuccess: () => getPicksCallback.execute(leagueId),
    });

    if (getPicksCallback.error) {
        return <>oops!</>;
    }

    return (
        <PicksContext
            value={{
                picks: getPicksCallback.result?.picks ?? [],
                create: createPicksCallback.execute,
                update: updatePickCallback.execute,
                deletePick: deletePickCallback.execute,
                isLoading:
                    getPicksCallback.loading ||
                    updatePickCallback.loading ||
                    createPicksCallback.loading ||
                    deletePickCallback.loading,
            }}
        >
            {children}
        </PicksContext>
    );
};
