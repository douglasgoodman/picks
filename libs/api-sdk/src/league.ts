export const LeagueRoute = {
    get: '/league/get' as const,
    create: '/league/create' as const,
    join: '/league/join' as const,
};

export interface MemberDto {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    userImageUrl?: string;
}

export interface TeamDto {
    userId: string;
    name: string;
}

export enum NoveltyTeam {
    Random = 'random',
    Favorite = 'favorite',
}

export interface OddsProvider {
    id: string;
    name: string;
}

export interface LeagueConfigurationDto {
    maxTeams: number;
    noveltyTeams: NoveltyTeam[];
    oddsProvider?: OddsProvider;
    preseason: boolean;
    postseason: boolean;
}

export interface LeagueDto {
    id: string;
    name: string;
    members: MemberDto[];
    admins: MemberDto[];
    teams: TeamDto[];
    configuration: LeagueConfigurationDto;
}

export interface GetLeagueRequestQueryParams {
    id?: string;
    nameOnly?: boolean;
}

export interface GetLeagueResponse {
    league: LeagueDto;
}

export interface GetMyLeaguesResponse {
    leagues: LeagueDto[];
}

export interface LeagueCreateRequest {
    name: string;
    maxTeams: number;
    oddsProviderId?: string | undefined;
    noveltyTeams: string[];
    preseason: boolean;
    postseason: boolean;
}

export interface LeagueCreateResponse {
    id: string;
}

export interface LeagueJoinRequest {
    id: string;
}

export interface LeagueJoinResponse {}
