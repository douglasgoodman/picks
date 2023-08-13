import { RequestHandler } from 'express';

export const signOutHandler: RequestHandler = async (req, res) => {
    req.session = null;
    res.sendStatus(200);
};
