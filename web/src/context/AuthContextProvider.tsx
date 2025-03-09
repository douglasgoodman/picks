import { type PropsWithChildren } from 'react';
import { AuthContext, AuthContextType, AuthenticatedUser } from './AuthContext';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { api } from '../api/api';
import { LoadingOverlay } from '../components/LoadingOverlay';

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
        isAuthenticated: !!userFetchCallback.result,
        inProgress,
        user: userFetchCallback.result ?? ({} as AuthenticatedUser),
        signIn: signInCallback.execute,
        signOut: signOutCallback.execute,
    };

    return (
        <AuthContext value={context}>
            <LoadingOverlay isLoading={inProgress}>{children}</LoadingOverlay>
        </AuthContext>
    );
};
