import { UpdatePickRequest, UpdatePickResponse } from '@picks/api-sdk';
import { RequestHandler } from 'express';
import { getLeagueDocument } from '../services/storage/league.js';
import {
    getPickDocument,
    updatePickDocument,
} from '../services/storage/picks.js';
import { PickDocument } from '@picks/types';

export const updatePickHandler: RequestHandler<
    unknown,
    UpdatePickResponse,
    UpdatePickRequest,
    unknown
> = async (req, res) => {
    const userId = req.session?.user?.id;
    if (!userId) {
        res.sendStatus(401);
        return;
    }

    const body = req.body;

    const pickDocument = await getPickDocument(body.id);

    if (pickDocument.team_id !== userId) {
        res.sendStatus(403);
    }

    const leagueDocument = await getLeagueDocument(pickDocument.league_id);
    if (
        !leagueDocument ||
        !leagueDocument.member_ids.includes(userId) ||
        !leagueDocument.teams.find((team) => team.user_id === userId)
    ) {
        res.sendStatus(404);
        return;
    }

    const updatedDocument: PickDocument = {
        ...pickDocument,
        winner: body.winner,
        spread: body.spread,
        funny_name: body.funnyName,
        locked: body.locked,
    };

    await updatePickDocument(updatedDocument);

    res.send({
        pick: {
            id: updatedDocument._id.toString(),
            leagueId: updatedDocument.league_id,
            teamId: updatedDocument.team_id,
            eventId: updatedDocument.event_id,
            winner: updatedDocument.winner,
            spread: updatedDocument.spread,
            funnyName: updatedDocument.funny_name,
            locked: updatedDocument.locked,
        },
    });
};
