import { LeagueDto } from '@picks/api-sdk';
import { createContext, useContext } from 'react';

export interface LeaguesContext {
    leagues: LeagueDto[];
}

export const LeaguesContext = createContext<LeaguesContext>({
    leagues: [],
});

export function useLeaguesContext() {
    return useContext(LeaguesContext);
}
