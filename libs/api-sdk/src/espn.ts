export const EspnRoute = {
    getOddsProviders: '/espn/oddsProviders' as const,
};

export interface OddsProviderDto {
    id: string;
    name: string;
}

export interface GetOddsProvidersResponse {
    oddsProviders: OddsProviderDto[];
}
