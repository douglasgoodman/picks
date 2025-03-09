export const PicksRoute = {
    create: '/picks/create' as const,
    get: '/picks/get' as const,
    update: '/picks/update' as const,
    delete: '/picks/delete' as const,
};

export interface PickDto {
    id: string;
    leagueId: string;
    teamId: string;
    eventId: string;
    winner: string;
    spread?: number;
    funnyName?: string;
    locked: boolean;
}

export interface CreatePickRequest {
    leagueId: string;
    teamId: string;
    eventId: string;
    winner: string;
    spread?: number;
    funnyName?: string;
    locked: boolean;
}

export interface CreatePickResponse {
    pick: PickDto;
}

export interface GetPicksRequest {
    leagueId: string;
    teamId?: string;
    eventId?: string;
}

export interface GetPicksResponse {
    picks: PickDto[];
}

export interface UpdatePickRequest {
    id: string;
    winner: string;
    spread?: number;
    funnyName?: string;
    locked: boolean;
}

export interface UpdatePickResponse {
    pick: PickDto;
}

export interface DeletePickRequestQueryParams {
    id: string;
}
