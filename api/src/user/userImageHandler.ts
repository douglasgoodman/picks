import { RequestHandler } from 'express';
import { getUserImage } from '../services/s3Service.js';

export const userImageHandler: RequestHandler = async (req, res) => {
    if (!req.session?.user?.id) {
        res.send(401);
        return;
    }

    const id = (req.query.id as string) ?? req.session.user.id;

    const image = await getUserImage(id);
    if (!image) {
        res.send(500);
        return;
    }
    image.pipe(res);
};
