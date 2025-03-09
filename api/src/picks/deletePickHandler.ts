import { DeletePickRequestQueryParams } from '@picks/api-sdk';
import { RequestHandler } from 'express';
import { getLeagueDocument } from '../services/storage/league.js';
import {
    deletePickDocument,
    getPickDocument,
} from '../services/storage/picks.js';

export const deletePickHandler: RequestHandler<
    unknown,
    unknown,
    unknown,
    DeletePickRequestQueryParams
> = async (req, res) => {
    const userId = req.session?.user?.id;
    if (!userId) {
        res.sendStatus(401);
        return;
    }

    const { id } = req.query;

    const pickDocument = await getPickDocument(id);
    if (!pickDocument) {
        res.sendStatus(404);
        return;
    }

    if (pickDocument.team_id !== userId) {
        res.sendStatus(403);
        return;
    }

    const leagueDocument = await getLeagueDocument(pickDocument.league_id);
    if (
        !leagueDocument ||
        !leagueDocument.member_ids.includes(userId) ||
        !leagueDocument.teams.find(
            (team) =>
                team.user_id === userId &&
                team.user_id === pickDocument.team_id,
        )
    ) {
        res.sendStatus(404);
        return;
    }

    await deletePickDocument(id);

    res.sendStatus(200);
};
