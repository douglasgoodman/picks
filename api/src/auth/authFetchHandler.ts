import { AuthFetchResponse } from '@picks/api-sdk';
import { RequestHandler } from 'express';
import { getUserDocument } from '../services/storage/user.js';

export const authFetchHandler: RequestHandler = async (req, res) => {
    if (!req.session?.user?.id) {
        res.sendStatus(401);
        return;
    }

    const { id } = req.session.user;

    try {
        const userDocument = await getUserDocument(id);
        if (!userDocument) {
            req.session = null;
            res.sendStatus(401);
            return;
        }

        const user: AuthFetchResponse = {
            email: userDocument.email,
            firstName: userDocument.first_name,
            lastName: userDocument.last_name,
            fullName: userDocument.full_name,
            userImageUrl: userDocument.user_image_url,
        };
        res.json(user);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};
