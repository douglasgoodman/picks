import { type PropsWithChildren } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { api } from '../api/api';

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    const localStorage = useLocalStorage();

    const userFetchCallback = useAsync(api.auth.fetch, [], {
        onSuccess: (user) => {
            localStorage.set<string>('signInHint', user.email);
        },
    });

    const signInCallback = useAsyncCallback(
        async (path?: string) => {
            const hint = localStorage.get<string>('signInHint');
            return await api.auth.start(path, hint);
        },
        {
            onSuccess: (response) => {
                location.href = response.url;
            },
        },
    );

    const signOutCallback = useAsyncCallback(api.auth.signOut, {
        onSuccess: () => {
            location.href = '/';
        },
    });

    const inProgress =
        userFetchCallback.loading ||
        userFetchCallback.status === 'not-requested' ||
        signInCallback.loading ||
        signOutCallback.loading;

    const context: AuthContextType = {
        inProgress,
        user: userFetchCallback.result,
        signIn: signInCallback.execute,
        signOut: signOutCallback.execute,
    };

    return (
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
};
