export const AuthRoute = {
    fetch: '/auth/fetch',
    start: '/auth/start',
    redirect: '/auth/redirect',
    complete: '/auth/complete',
    signOut: '/auth/signout',
};

export interface AuthFetchResponse {
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    userImageUrl?: string;
}

export interface AuthStartResponse {
    url: string;
}
