export const TeamRoute = {
    create: '/team/create' as const,
};

export interface TeamCreateRequest {
    userId: string;
    leagueId: string;
    name: string;
}

export interface TeamCreateResponse {}
