import { GetPicksRequest, GetPicksResponse } from '@picks/api-sdk';
import { RequestHandler } from 'express';
import { getLeagueDocument } from '../services/storage/league.js';
import { getPicksDocuments } from '../services/storage/picks.js';

export const getPicksHandler: RequestHandler<
    unknown,
    GetPicksResponse,
    GetPicksRequest,
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

    const picksDocuments = await getPicksDocuments(
        body.leagueId,
        body.teamId,
        body.eventId,
    );

    res.send({
        picks: picksDocuments.map((doc) => ({
            id: doc._id!.toString(),
            leagueId: doc.league_id,
            teamId: doc.team_id,
            eventId: doc.event_id,
            winner: doc.winner,
            spread: doc.spread,
            funnyName: doc.funny_name,
            locked: doc.locked,
        })),
    });
};
