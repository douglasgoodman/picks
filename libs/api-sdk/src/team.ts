export const TeamRoute = {
    create: '/team/create',
};

export interface TeamCreateRequest {
    userId: string;
    leagueId: string;
    name: string;
}

export interface TeamCreateResponse {}
