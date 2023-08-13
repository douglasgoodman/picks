import { AuthFetchResponse } from '@picks/api-sdk';
import React from 'react';

export type AuthenticatedUser = AuthFetchResponse;

export interface AuthContextType {
    user: AuthenticatedUser | undefined;
    inProgress: boolean | undefined;
    signIn: (path?: string) => void;
    signOut: () => void;
}

const notMountedFunction = () => {
    throw new Error();
};

export const AuthContext = React.createContext<AuthContextType>({
    user: undefined,
    inProgress: undefined,
    signIn: notMountedFunction,
    signOut: notMountedFunction,
});

export function useAuthContext(): AuthContextType {
    return React.useContext(AuthContext);
}
