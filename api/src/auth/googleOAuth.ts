import { AuthRoute } from '@picks/api-sdk';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { config } from '../config.js';

const authCompleteUri = `https://${config.apiDomain}${AuthRoute.complete}`;

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
];
const { id: clientId, secret: clientSecret } = config.googleOauthClient;

const createClient = (refreshToken?: string): OAuth2Client => {
    const oauth2Client = new google.auth.OAuth2({
        clientId,
        clientSecret,
        redirectUri: authCompleteUri,
    });
    if (refreshToken) {
        oauth2Client.setCredentials({ refresh_token: refreshToken });
    }
    return oauth2Client;
};

const isTokenValid = async (
    client: OAuth2Client,
    idToken: string,
    userId: string,
): Promise<{ success: boolean }> => {
    try {
        const loginTicket = await client.verifyIdToken({
            idToken,
            audience: clientId,
        });
        if (loginTicket.getPayload()?.sub !== userId) {
            throw new Error('Token ID does not match user ID');
        }
        return { success: true };
    } catch (e) {
        console.error(e);
        return { success: false };
    }
};

const generateAuthUrl = (
    client: OAuth2Client,
    nonce: string,
    hint?: string,
): string =>
    client.generateAuthUrl({
        scope: scopes,
        include_granted_scopes: true,
        state: nonce,
        login_hint: hint,
        access_type: 'offline',
    });

const refreshToken = async (
    client: OAuth2Client,
): Promise<Credentials | undefined> => {
    try {
        const { credentials } = await client.refreshAccessToken();
        return credentials;
    } catch {
        return undefined;
    }
};

export const googleOAuth = {
    createClient,
    isTokenValid,
    refreshToken,
    generateAuthUrl,
};
