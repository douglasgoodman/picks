import { UserRoute } from '@picks/api-sdk';
import { Express } from 'express';
import { userImageHandler } from './userImageHandler';

export function addUserRouter(app: Express) {
    app.get(UserRoute.image, userImageHandler);
}
