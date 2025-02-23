import { LeagueDto } from '@picks/api-sdk';
import { createContext, useContext } from 'react';

export interface LeagueContext {
    league: LeagueDto;
}

export const LeagueContext = createContext<LeagueContext>({
    league: {} as LeagueDto,
});

export function useLeagueContext() {
    return useContext(LeagueContext);
}
