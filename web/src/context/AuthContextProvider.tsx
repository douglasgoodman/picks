import { useState, type PropsWithChildren } from 'react';
import axios from 'axios';
import { AuthContext, AuthContextType } from './AuthContext';
import { environment } from '../environment';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
    AuthFetchResponse,
    AuthStartResponse,
    AuthRoute,
} from '@picks/api-sdk';

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: environment.apiDomain,
});

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const localStorage = useLocalStorage();
    const [user, setUser] = useState<AuthFetchResponse>();

    const { loading: fetchInProgress } = useAsync(async () => {
        const response = await axiosInstance.get<AuthFetchResponse>(
            AuthRoute.fetch,
        );
        const userResponse = response.data;
        localStorage.set<string>('signInHint', userResponse.email);
        setUser(userResponse);
    }, []);

    const { loading: signInInProgress, execute: signIn } = useAsyncCallback(
        async (path?: string) => {
            const hint = localStorage.get<string>('signInHint');
            const response = await axiosInstance.get<AuthStartResponse>(
                AuthRoute.start,
                {
                    params: { path, hint },
                },
            );
            location.href = response.data.url;
        },
    );

    const { loading: signOutInProgress, execute: signOut } = useAsyncCallback(
        async () => {
            await axiosInstance.get(AuthRoute.signOut);
            location.href = '/';
        },
    );

    const inProgress = fetchInProgress || signInInProgress || signOutInProgress;

    const context: AuthContextType = {
        inProgress,
        user,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
};
