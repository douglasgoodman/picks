export const LeagueRoute = {
    get: '/league/get',
    create: '/league/create',
    join: '/league/join',
};

export interface LeagueGetRequest {
    id?: string;
}

export interface MemberDto {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    userImageUrl?: string;
}

export interface LeagueDto {
    id: string;
    name: string;
    maxPlayers: number;
    members: MemberDto[];
}

export interface LeagueGetResponse {
    leagues: LeagueDto[];
}

export interface LeagueCreateRequest {
    name: string;
    maxPlayers: number;
}

export interface LeagueCreateResponse {
    id: string;
}

export interface LeagueJoinRequest {
    id: string;
}

export interface LeagueJoinResponse {}
