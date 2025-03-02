import { Express } from 'express';
import { EspnRoute } from '@picks/api-sdk';
import { getOddsProvidersHandler } from './getOddsProvidersHandler.js';

export function addEspnRouter(app: Express) {
    app.get(EspnRoute.getOddsProviders, getOddsProvidersHandler);
}
