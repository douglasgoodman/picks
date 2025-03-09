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
    const userId = req.session?.user?.id;
    if (!userId) {
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

    if (doc.member_ids.includes(userId)) {
        res.sendStatus(409);
        return;
    }

    if (doc.member_ids.length >= doc.configuration.max_teams) {
        res.status(400);
        res.send({ message: 'League is full' });
        return;
    }

    await addLeagueMember(req.body.id, userId);

    res.sendStatus(200);
};
