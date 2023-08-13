import { UserDocument } from '@picks/types';
import { RequestHandler } from 'express';
import { google } from 'googleapis';
import { config } from '../config';
import { uploadUserImage } from '../services/s3Service';
import { putUserDocument } from '../services/storageService';
import { googleOAuth } from './googleOAuth';

export const authCompleteHandler: RequestHandler = async (req, res) => {
    const error = req.query.error;
    if (!!error) {
        console.error(error);
    }

    if (!req.session?.auth) {
        res.sendStatus(401);
        return;
    }

    if (!req.query.state || req.query.state !== req.session.auth.nonce) {
        res.sendStatus(401);
        return;
    }

    const code = req.query.code as string;
    if (!code || typeof code !== 'string') {
        console.error('no code');
        res.sendStatus(401);
        return;
    }

    const oauthClient = googleOAuth.createClient();

    const { tokens } = await oauthClient.getToken(code);
    console.log(JSON.stringify(tokens));
    if (!tokens.access_token) {
        console.log('no access token!!');
    }

    const oauth2 = google.oauth2('v2');
    const { data: userInfo } = await oauth2.userinfo.get({
        oauth_token: tokens.access_token!,
    });

    const userDocument: UserDocument = {
        id: userInfo.id!,
        email: userInfo.email!,
        firstName: userInfo.given_name!,
        lastName: userInfo.family_name!,
        fullName: userInfo.name!,
        gender: userInfo.gender!,
    };

    if (userInfo.picture) {
        const url = await uploadUserImage(userDocument.id, userInfo.picture);
        if (!!url) {
            userDocument.userImageUrl = url;
        }
    }

    await putUserDocument(userDocument);

    const path = req.session.auth.path ?? '/';
    req.session = null;

    req.session = {
        user: {
            id: userInfo.id!,
            email: userInfo.email!,
            accessToken: tokens.access_token!,
            idToken: tokens.id_token!,
        },
    };

    res.redirect(`https://${config.webDomain}${path}`);
};
