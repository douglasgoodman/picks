import { LeagueDto } from '@picks/api-sdk';
import { createContext, useContext } from 'react';

export interface LeagueContext {
    league: LeagueDto;
    refresh: () => void;
}

export const LeagueContext = createContext<LeagueContext>({
    league: {} as LeagueDto,
    refresh: () => {
        throw new Error('The LeagueContext provider is not mounted.');
    },
});

export function useLeagueContext() {
    return useContext(LeagueContext);
}
