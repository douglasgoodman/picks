import { LeagueJoinRequest, LeagueJoinResponse } from '@picks/api-sdk';
import { RequestHandler } from 'express';
import {
    addLeagueMember,
    getLeagueDocument,
} from '../services/storage/league.js';

export const joinLeagueHandler: RequestHandler<
    unknown,
    LeagueJoinResponse,
    LeagueJoinRequest,
    unknown
> = async (req, res) => {
    if (!req.session?.user?.id) {
        res.sendStatus(401);
        return;
    }

    if (!req.body.id) {
        res.sendStatus(400);
        return;
    }

    const doc = await getLeagueDocument(req.body.id);
    if (!doc) {
        res.sendStatus(404);
        return;
    }

    if (doc.member_ids.includes(req.session.user.id)) {
        res.sendStatus(409);
        return;
    }

    if (doc.member_ids.length >= doc.configuration.max_teams) {
        res.status(400);
        res.send({ message: 'League is full' });
        return;
    }

    await addLeagueMember(req.body.id, req.session.user.id);

    res.sendStatus(200);
};
