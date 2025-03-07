import { createContext, useContext } from 'react';
import { AuthFetchResponse } from '@picks/api-sdk';

export type AuthenticatedUser = AuthFetchResponse;

export interface AuthContextType {
    isAuthenticated: boolean;
    user: AuthenticatedUser;
    inProgress: boolean | undefined;
    signIn: (path?: string) => void;
    signOut: () => void;
}

const notMountedFunction = () => {
    throw new Error();
};

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: {} as AuthenticatedUser,
    inProgress: undefined,
    signIn: notMountedFunction,
    signOut: notMountedFunction,
});

export function useAuthContext(): AuthContextType {
    return useContext(AuthContext);
}
