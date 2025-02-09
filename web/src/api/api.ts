import axios, { AxiosResponse } from 'axios';
import { environment } from '../environment';
import {
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
    league: {
        get: async (id?: string) => {
            const response = await axiosInstance.post<
                LeagueGetRequest,
                AxiosResponse<LeagueGetResponse>
            >(LeagueRoute.get, { id });
            return response.data;
        },
        create: async (name: string, maxPlayers: number) => {
            const response = await axiosInstance.post<
                LeagueCreateRequest,
                AxiosResponse<LeagueCreateResponse>
            >(LeagueRoute.create, { name, maxPlayers });
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
