import {
    GetScheduleRequestQueryParams,
    GetScheduleResponse,
} from '@picks/api-sdk';
import { RequestHandler } from 'express';
import { getLeagueDocument } from '../services/storage/league.js';
import { getScheduleDocument } from '../services/storage/schedule.js';

export const getScheduleHandler: RequestHandler<
    unknown,
    GetScheduleResponse,
    unknown,
    GetScheduleRequestQueryParams
> = async (req, res) => {
    const userId = req.session?.user?.id;
    if (!userId) {
        res.sendStatus(401);
        return;
    }

    const { leagueId, year } = req.query;
    if (!leagueId) {
        res.sendStatus(400);
        return;
    }

    const leagueDocument = await getLeagueDocument(leagueId);

    if (!leagueDocument) {
        res.sendStatus(404);
        return;
    }

    if (!leagueDocument.member_ids.includes(userId)) {
        res.sendStatus(403);
        return;
    }

    const now = new Date();
    const scheduleDocument = await getScheduleDocument(
        year ?? now.getFullYear() - 1,
    );

    if (!leagueDocument.configuration.preseason) {
        scheduleDocument.weeks = scheduleDocument.weeks.filter(
            (w) => !w.is_preseason,
        );
    }
    if (!leagueDocument.configuration.postseason) {
        scheduleDocument.weeks = scheduleDocument.weeks.filter(
            (w) => !w.is_postseason,
        );
    }

    res.send({ schedule: scheduleDocument });
};
