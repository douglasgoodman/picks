import { GetOddsProvidersResponse, OddsProviderDto } from '@picks/api-sdk';
import { OddsProviderDocument } from '@picks/types';
import { RequestHandler } from 'express';
import { api } from '../services/espn/index.js';
import {
    getOddsProviderDocuments,
    insertOddsProviderDocuments,
} from '../services/storage/oddsProviders.js';

export const getOddsProvidersHandler: RequestHandler<
    unknown,
    GetOddsProvidersResponse,
    unknown,
    unknown
> = async (req, res) => {
    if (!req.session?.user?.id) {
        res.sendStatus(401);
        return;
    }

    const docs = await getOddsProviderDocuments();

    if (docs && docs.length) {
        res.send({
            oddsProviders: docs.map<OddsProviderDto>((d) => ({
                id: d._id,
                name: d.name,
            })),
        });
        return;
    }

    const providers = await api.getOddsProviders();
    const documents = providers.map<OddsProviderDocument>((p) => ({
        _id: p.id,
        name: p.name,
        url: p['$ref'],
    }));

    await insertOddsProviderDocuments(documents);

    res.send({
        oddsProviders: documents.map<OddsProviderDto>((d) => ({
            id: d._id,
            name: d.name,
        })),
    });
};
