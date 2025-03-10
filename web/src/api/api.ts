import axios, { AxiosResponse } from 'axios';
import { environment } from '../environment';
import {
    AuthFetchResponse,
    AuthRoute,
    AuthStartResponse,
    CreatePickRequest,
    CreatePickResponse,
    EspnRoute,
    GetLeagueResponse,
    GetMyLeaguesResponse,
    GetOddsProvidersResponse,
    GetPicksRequest,
    GetPicksResponse,
    GetScheduleResponse,
    LeagueCreateRequest,
    LeagueCreateResponse,
    LeagueJoinRequest,
    LeagueJoinResponse,
    LeagueRoute,
    PicksRoute,
    TeamCreateRequest,
    TeamCreateResponse,
    TeamRoute,
    UpdatePickRequest,
    UpdatePickResponse,
} from '@picks/api-sdk';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: environment.apiDomain,
});

export const api = {
    auth: {
        fetch: async () => {
            const response = await axiosInstance.get<AuthFetchResponse>(
                AuthRoute.fetch,
            );
            return response.data;
        },
        start: async (path?: string, hint?: string) => {
            const response = await axiosInstance.get<AuthStartResponse>(
                AuthRoute.start,
                {
                    params: { path, hint },
                },
            );
            return response.data;
        },
        signOut: async () => {
            await axiosInstance.get(AuthRoute.signOut);
        },
    },
    league: {
        get: async (id: string, nameOnly?: boolean) => {
            const response = await axiosInstance.get<GetLeagueResponse>(
                LeagueRoute.get,
                { params: { id, nameOnly } },
            );
            return response.data;
        },
        getMy: async () => {
            const response = await axiosInstance.get<GetMyLeaguesResponse>(
                LeagueRoute.get,
            );
            return response.data;
        },
        create: async (
            name: string,
            maxTeams: number,
            noveltyTeams: string[],
            preseason: boolean,
            postseason: boolean,
            oddsProviderId?: string,
        ) => {
            const response = await axiosInstance.post<
                LeagueCreateRequest,
                AxiosResponse<LeagueCreateResponse>
            >(LeagueRoute.create, {
                name,
                maxTeams,
                noveltyTeams,
                oddsProviderId,
                preseason,
                postseason,
            });
            return response.data;
        },
        join: async (id: string) => {
            const response = await axiosInstance.post<
                LeagueJoinRequest,
                AxiosResponse<LeagueJoinResponse>
            >(LeagueRoute.join, { id });
            return response.data;
        },
    },
    team: {
        create: async (userId: string, leagueId: string, name: string) => {
            const response = await axiosInstance.post<
                TeamCreateRequest,
                AxiosResponse<TeamCreateResponse>
            >(TeamRoute.create, { userId, leagueId, name });
            return response.data;
        },
    },
    espn: {
        getOddsProviders: async () => {
            const response = await axiosInstance.get<GetOddsProvidersResponse>(
                EspnRoute.getOddsProviders,
            );
            return response.data;
        },
        getSchedule: async (leagueId: string, year?: number) => {
            const response = await axiosInstance.get<GetScheduleResponse>(
                EspnRoute.getSchedule,
                { params: { leagueId, year } },
            );
            return response.data;
        },
    },
    picks: {
        create: async (
            leagueId: string,
            teamId: string,
            eventId: string,
            winner: string,
            locked: boolean,
            spread?: number,
            funnyName?: string,
        ) => {
            const response = await axiosInstance.post<
                CreatePickRequest,
                AxiosResponse<CreatePickResponse>,
                CreatePickRequest
            >(PicksRoute.create, {
                leagueId,
                teamId,
                eventId,
                winner,
                spread,
                funnyName,
                locked,
            });
            return response.data;
        },
        get: async (leagueId: string, teamId?: string, eventId?: string) => {
            const response = await axiosInstance.post<
                GetPicksRequest,
                AxiosResponse<GetPicksResponse>
            >(PicksRoute.get, { leagueId, teamId, eventId });
            return response.data;
        },
        update: async (
            id: string,
            winner: string,
            locked: boolean,
            spread?: number,
            funnyName?: string,
        ) => {
            const response = await axiosInstance.post<
                UpdatePickRequest,
                AxiosResponse<UpdatePickResponse>,
                UpdatePickRequest
            >(PicksRoute.update, { id, winner, spread, funnyName, locked });
            return response.data;
        },
        delete: async (id: string) => {
            const response = await axiosInstance.post(
                PicksRoute.delete,
                undefined,
                {
                    params: { id },
                },
            );
            return response.data;
        },
    },
};
