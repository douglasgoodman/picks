import { SeasonDocument } from '@picks/types';

export type ScheduleDto = SeasonDocument;

export const EspnRoute = {
    getOddsProviders: '/espn/oddsProviders' as const,
    getSchedule: '/espn/schedule' as const,
};

export interface OddsProviderDto {
    id: string;
    name: string;
}

export interface GetOddsProvidersResponse {
    oddsProviders: OddsProviderDto[];
}

export interface GetScheduleRequestQueryParams {
    leagueId: string;
    year?: number;
}

export interface GetScheduleResponse {
    schedule: ScheduleDto;
}
