import { Express } from 'express';
import { LeagueRoute } from '@picks/api-sdk';
import { createLeagueHandler } from './createLeagueHandler.js';
import { joinLeagueHandler } from './joinLeagueHandler.js';
import { getLeagueHandler } from './getLeagueHandler.js';

export function addLeagueRouter(app: Express) {
    app.get(LeagueRoute.get, getLeagueHandler);
    app.post(LeagueRoute.create, createLeagueHandler);
    app.post(LeagueRoute.join, joinLeagueHandler);
}
