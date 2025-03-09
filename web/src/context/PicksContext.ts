import { PickDto } from '@picks/api-sdk';
import { createContext, useContext } from 'react';

export interface PicksContext {
    picks: PickDto[];
    create: (
        leagueId: string,
        teamId: string,
        eventId: string,
        winner: string,
        locked: boolean,
        spread?: number,
        funnyName?: string,
    ) => void;
    update: (
        id: string,
        winner: string,
        locked: boolean,
        spread?: number,
        funnyName?: string,
    ) => void;
    deletePick: (id: string) => void;
    isLoading: boolean;
}

export const PicksContext = createContext<PicksContext>({
    picks: [],
    create: () => {},
    update: () => {},
    deletePick: () => {},
    isLoading: false,
});

export function usePicksContext() {
    return useContext(PicksContext);
}
