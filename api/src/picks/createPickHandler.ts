import { CreatePickRequest, CreatePickResponse } from '@picks/api-sdk';
import { RequestHandler } from 'express';
import { getLeagueDocument } from '../services/storage/league.js';
import {
    getPicksDocuments,
    insertPickDocument,
} from '../services/storage/picks.js';

export const createPickHandler: RequestHandler<
    unknown,
    CreatePickResponse,
    CreatePickRequest,
    unknown
> = async (req, res) => {
    const userId = req.session?.user?.id;
    if (!userId) {
        res.sendStatus(401);
        return;
    }

    const body = req.body;

    const leagueDocument = await getLeagueDocument(body.leagueId);
    if (
        !leagueDocument ||
        !leagueDocument.member_ids.includes(userId) ||
        !leagueDocument.teams.find((team) => team.user_id === userId)
    ) {
        res.sendStatus(404);
        return;
    }

    // change to exists check!!
    const picksDocuments = await getPicksDocuments(
        body.leagueId,
        body.teamId,
        body.eventId,
    );

    if (picksDocuments.length) {
        res.sendStatus(409);
        return;
    }

    await insertPickDocument({
        league_id: body.leagueId,
        team_id: body.teamId,
        event_id: body.eventId,
        winner: body.winner,
        spread: body.spread,
        funny_name: body.funnyName,
        locked: body.locked,
    });

    const createdDoc = await getPicksDocuments(
        body.leagueId,
        body.teamId,
        body.eventId,
    );
    res.send({ pick: { ...body, id: createdDoc[0]._id!.toString() } });
};
