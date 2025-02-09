import { Express } from 'express';
import { AuthRoute } from '@picks/api-sdk';
import { authFetchHandler } from './authFetchHandler.js';
import { authStartHandler } from './authStartHandler.js';
import { authRedirectHandler } from './authRedirectHandler.js';
import { authCompleteHandler } from './authCompleteHandler.js';
import { signOutHandler } from './signOutHandler.js';

export function addAuthRouter(app: Express) {
    app.get(AuthRoute.fetch, authFetchHandler);
    app.get(AuthRoute.start, authStartHandler);
    app.get(AuthRoute.redirect, authRedirectHandler);
    app.get(AuthRoute.complete, authCompleteHandler);
    app.get(AuthRoute.signOut, signOutHandler);
}
