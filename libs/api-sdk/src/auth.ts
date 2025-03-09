export const AuthRoute = {
    fetch: '/auth/fetch' as const,
    start: '/auth/start' as const,
    redirect: '/auth/redirect' as const,
    complete: '/auth/complete' as const,
    signOut: '/auth/signout' as const,
};

export interface AuthFetchResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    userImageUrl?: string;
}

export interface AuthStartResponse {
    url: string;
}
