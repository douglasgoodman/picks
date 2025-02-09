import { RequestHandler } from 'express';
import { randomBytes } from 'node:crypto';
import { config } from '../config.js';
import { googleOAuth } from './googleOAuth.js';
import { AuthRoute, AuthStartResponse } from '@picks/api-sdk';

const authRedirectUrl = `https://${config.apiDomain}${AuthRoute.redirect}`;

export const authStartHandler: RequestHandler = (req, res) => {
    if (!req.session) {
        res.sendStatus(401);
        return;
    }

    const oauthClient = googleOAuth.createClient();
    const path = req.query.path as string;
    const loginHint = req.query.hint as string;
    const nonce = randomBytes(16).toString('base64');
    const authStartUrl = googleOAuth.generateAuthUrl(
        oauthClient,
        nonce,
        loginHint,
    );
    req.session.auth = { nonce, authStartUrl, path };
    const responseBody: AuthStartResponse = { url: authRedirectUrl };
    res.json(responseBody);
};
