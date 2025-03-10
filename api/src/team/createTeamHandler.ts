import { TeamCreateResponse, TeamCreateRequest } from '@picks/api-sdk';
import { RequestHandler } from 'express';
import {
    addLeagueTeam,
    getLeagueDocument,
} from '../services/storage/league.js';

export const createTeamHandler: RequestHandler<
    unknown,
    TeamCreateResponse,
    TeamCreateRequest,
    unknown
> = async (req, res) => {
    if (!req.session?.user?.id) {
        res.sendStatus(401);
        return;
    }

    const { userId, leagueId, name } = req.body;

    const doc = await getLeagueDocument(leagueId);
    if (!doc) {
        res.sendStatus(404);
        return;
    }

    if (doc.teams.find((t) => t.user_id === userId)) {
        res.sendStatus(400);
        return;
    }

    if (doc.teams.find((t) => t.name === name)) {
        res.status(409);
        res.send({ message: 'A team with that name already exists' });
        return;
    }

    if (!doc.member_ids.includes(req.session.user.id)) {
        res.sendStatus(403);
        return;
    }

    await addLeagueTeam(leagueId, userId, name);

    res.status(200).send();
};
