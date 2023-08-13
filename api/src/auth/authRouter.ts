import { Express } from 'express';
import { AuthRoute } from '@picks/api-sdk';
import { authFetchHandler } from './authFetchHandler';
import { authStartHandler } from './authStartHandler';
import { authRedirectHandler } from './authRedirectHandler';
import { authCompleteHandler } from './authCompleteHandler';
import { signOutHandler } from './signOutHandler';

export function addAuthRouter(app: Express) {
    app.get(AuthRoute.fetch, authFetchHandler);
    app.get(AuthRoute.start, authStartHandler);
    app.get(AuthRoute.redirect, authRedirectHandler);
    app.get(AuthRoute.complete, authCompleteHandler);
    app.get(AuthRoute.signOut, signOutHandler);
}
