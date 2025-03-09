import { LeagueRoute } from '@picks/api-sdk';
import { Express } from 'express';
import { createLeagueHandler } from './createLeagueHandler.js';
import { getLeagueHandler } from './getLeagueHandler.js';
import { joinLeagueHandler } from './joinLeagueHandler.js';

export function addLeagueRouter(app: Express) {
    app.get(LeagueRoute.get, getLeagueHandler);
    app.post(LeagueRoute.create, createLeagueHandler);
    app.post(LeagueRoute.join, joinLeagueHandler);
}
