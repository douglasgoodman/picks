import { RequestHandler } from 'express';

export const authRedirectHandler: RequestHandler = async (req, res) => {
    if (!req.session?.auth?.authStartUrl) {
        res.sendStatus(401);
        return;
    }
    res.redirect(req.session.auth.authStartUrl);
};
