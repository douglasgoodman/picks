import { PicksRoute } from '@picks/api-sdk';
import { Express } from 'express';
import { createPickHandler } from './createPickHandler.js';
import { deletePickHandler } from './deletePickHandler.js';
import { getPicksHandler } from './getPicksHandler.js';
import { updatePickHandler } from './updatePickHandler.js';

export function addPicksRouter(app: Express) {
    app.post(PicksRoute.create, createPickHandler);
    app.post(PicksRoute.get, getPicksHandler);
    app.post(PicksRoute.update, updatePickHandler);
    app.post(PicksRoute.delete, deletePickHandler);
}
