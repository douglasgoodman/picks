import { RequestHandler } from 'express';
import { getUserImage } from '../services/s3Service';

export const userImageHandler: RequestHandler = async (req, res) => {
    console.log(JSON.stringify(req.session));
    if (!req.session?.user?.id) {
        res.send(401);
        return;
    }
    const image = await getUserImage(req.session.user.id);
    if (!image) {
        res.send(500);
        return;
    }
    image.pipe(res);
};
