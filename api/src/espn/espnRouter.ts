import { EspnRoute } from '@picks/api-sdk';
import { Express } from 'express';
import { getOddsProvidersHandler } from './getOddsProvidersHandler.js';
import { getScheduleHandler } from './getScheduleHandler.js';

export function addEspnRouter(app: Express) {
    app.get(EspnRoute.getOddsProviders, getOddsProvidersHandler);
    app.get(EspnRoute.getSchedule, getScheduleHandler);
}
