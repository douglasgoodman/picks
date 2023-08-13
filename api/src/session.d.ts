declare namespace CookieSessionInterfaces {
    interface CookieSessionObject {
        auth?: {
            nonce: string;
            authStartUrl: string;
            path?: string;
        };
        user?: {
            id: string;
            email: string;
            accessToken: string;
            idToken: string;
        };
    }
}
