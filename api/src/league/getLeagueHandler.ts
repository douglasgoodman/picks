import { LeagueGetRequest, LeagueGetResponse, MemberDto } from '@picks/api-sdk';
import { RequestHandler } from 'express';
import {
    getLeagueDocument,
    getLeagueDocuments,
} from '../services/storage/league.js';
import { getUserDocuments } from '../services/storage/user.js';

export const getLeagueHandler: RequestHandler<
    unknown,
    LeagueGetResponse,
    LeagueGetRequest,
    unknown
> = async (req, res) => {
    if (!req.session?.user?.id) {
        res.sendStatus(401);
        return;
    }

    const docs = req.body.id
        ? [await getLeagueDocument(req.body.id)].filter(Boolean)
        : await getLeagueDocuments(req.session.user.id);

    if (!docs || docs.length === 0) {
        res.sendStatus(404);
        return;
    }

    const reducedMemberIds = docs.reduce((prev, curr) => {
        curr.member_ids.forEach((id) => prev.add(id));
        return prev;
    }, new Set<string>());
    const members = await getUserDocuments(Array.from(reducedMemberIds));
    if (!members || members.length !== reducedMemberIds.size) {
        res.sendStatus(400);
        return;
    }

    const mappedMembers = members.map<MemberDto>((member) => ({
        id: member._id,
        firstName: member.first_name,
        lastName: member.last_name,
        fullName: member.full_name,
        userImageUrl: member.user_image_url,
    }));

    res.send({
        leagues: docs.map((doc) => ({
            id: doc._id,
            name: doc.name,
            maxTeams: doc.max_teams,
            members: doc.member_ids.map(
                (id) => mappedMembers.find((m) => m.id === id)!,
            ),
            teams: doc.teams.map((team) => ({
                userId: team.user_id,
                name: team.name,
            })),
        })),
    });
};
