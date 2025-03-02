import {
    GetLeagueResponse,
    GetMyLeaguesResponse,
    LeagueDto,
    MemberDto,
    NoveltyTeam,
} from '@picks/api-sdk';
import { RequestHandler } from 'express';
import {
    getLeagueDocument,
    getLeagueDocuments,
} from '../services/storage/league.js';
import { getUserDocuments } from '../services/storage/user.js';
import { LeagueDocument } from '@picks/types';

export const getLeagueHandler: RequestHandler<
    unknown,
    GetLeagueResponse | GetMyLeaguesResponse,
    unknown,
    { id?: string }
> = async (req, res) => {
    if (!req.session?.user?.id) {
        res.sendStatus(401);
        return;
    }

    if (req.query.id) {
        const doc = await getLeagueDocument(req.query.id);
        if (!doc) {
            res.sendStatus(404);
            return;
        }
        const users = await mapMembers([doc]);
        const league = mapLeague(doc, users);
        res.send({ league });
        return;
    } else {
        const docs = await getLeagueDocuments(req.session.user.id);
        if (!docs || !docs.length) {
            res.send({ leagues: [] });
            return;
        }
        const users = await mapMembers(docs);
        const leagues = docs.map((doc) => mapLeague(doc, users));
        res.send({ leagues });
        return;
    }
};

async function mapMembers(docs: LeagueDocument[]): Promise<MemberDto[]> {
    const reducedMemberIds = docs.reduce((prev, curr) => {
        curr.member_ids.forEach((id) => prev.add(id));
        return prev;
    }, new Set<string>());
    const members = await getUserDocuments(Array.from(reducedMemberIds));

    return members.map<MemberDto>((member) => ({
        id: member._id,
        firstName: member.first_name,
        lastName: member.last_name,
        fullName: member.full_name,
        userImageUrl: member.user_image_url,
    }));
}

function mapLeague(doc: LeagueDocument, mappedMembers: MemberDto[]): LeagueDto {
    return {
        id: doc._id,
        name: doc.name,
        members: doc.member_ids.map(
            (id) => mappedMembers.find((m) => m.id === id)!,
        ),
        admins: doc.admin_ids.map(
            (id) => mappedMembers.find((m) => m.id === id)!,
        ),
        teams: doc.teams.map((team) => ({
            userId: team.user_id,
            name: team.name,
        })),
        configuration: {
            maxTeams: doc.configuration.max_teams,
            noveltyTeams: doc.configuration.novelty_teams as NoveltyTeam[],
            oddsProvider: doc.configuration.odds_provider,
        },
    };
}
