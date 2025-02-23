import axios, { AxiosResponse } from 'axios';
import { environment } from '../environment';
import {
    AuthFetchResponse,
    AuthRoute,
    AuthStartResponse,
    LeagueCreateRequest,
    LeagueCreateResponse,
    LeagueGetRequest,
    LeagueGetResponse,
    LeagueJoinRequest,
    LeagueJoinResponse,
    LeagueRoute,
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
        get: async (id?: string) => {
            const response = await axiosInstance.post<
                LeagueGetRequest,
                AxiosResponse<LeagueGetResponse>
            >(LeagueRoute.get, { id });
            return response.data;
        },
        create: async (name: string, maxTeams: number) => {
            const response = await axiosInstance.post<
                LeagueCreateRequest,
                AxiosResponse<LeagueCreateResponse>
            >(LeagueRoute.create, { name, maxTeams: maxTeams });
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
};
