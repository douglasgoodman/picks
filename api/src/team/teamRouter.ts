import { TeamRoute } from '@picks/api-sdk';
import { Express } from 'express';
import { createTeamHandler } from './createTeamHandler.js';

export function addTeamRouter(app: Express) {
    app.post(TeamRoute.create, createTeamHandler);
}
