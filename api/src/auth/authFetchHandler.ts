import { AuthFetchResponse } from '@picks/api-sdk';
import { RequestHandler } from 'express';
import { getUserDocument } from '../services/storageService';

export const authFetchHandler: RequestHandler = async (req, res) => {
    if (!req.session?.user?.id) {
        res.sendStatus(401);
        return;
    }

    const { id } = req.session.user;

    const userDocument = await getUserDocument(id);
    if (!userDocument) {
        req.session = null;
        res.sendStatus(401);
        return;
    }

    const user: AuthFetchResponse = {
        email: userDocument.email,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        fullName: userDocument.fullName,
        userImageUrl: userDocument.userImageUrl,
    };
    res.json(user);
};
