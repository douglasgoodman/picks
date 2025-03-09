import {
    GetLeagueRequestQueryParams,
    GetLeagueResponse,
    GetMyLeaguesResponse,
    LeagueDto,
    MemberDto,
    NoveltyTeam,
    TeamDto,
} from '@picks/api-sdk';
import { RequestHandler } from 'express';
import {
    getLeagueDocument,
    getLeagueDocuments,
} from '../services/storage/league.js';
import { getUserDocuments } from '../services/storage/user.js';
import { LeagueDocument, Team } from '@picks/types';

const noveltyTeamIds = Object.values(NoveltyTeam) as string[];

export const getLeagueHandler: RequestHandler<
    unknown,
    GetLeagueResponse | GetMyLeaguesResponse,
    unknown,
    GetLeagueRequestQueryParams
> = async (req, res) => {
    const userId = req.session?.user?.id;
    if (!userId) {
        res.sendStatus(401);
        return;
    }

    const { id, nameOnly } = req.query;

    if (id) {
        const doc = await getLeagueDocument(id);
        if (!doc) {
            res.sendStatus(404);
            return;
        }
        if (!doc.member_ids.includes(userId)) {
            if (nameOnly) {
                res.send({
                    league: { id: doc._id, name: doc.name } as LeagueDto,
                });
                return;
            }
            res.sendStatus(404);
            return;
        }
        const users = await mapMembers([doc]);
        const league = mapLeague(doc, users);
        league.teams.sort(teamCompare);
        res.send({ league });
        return;
    } else {
        const docs = await getLeagueDocuments(userId);
        if (!docs || !docs.length) {
            res.send({ leagues: [] });
            return;
        }
        const users = await mapMembers(docs);
        const leagues = docs.map((doc) => mapLeague(doc, users));
        leagues.forEach((league) => league.teams.sort(teamCompare));
        res.send({ leagues });
        return;
    }

    function teamCompare(a: TeamDto, b: TeamDto) {
        if (a.userId === userId) {
            return -1;
        }

        if (b.userId === userId) {
            return 1;
        }

        if (noveltyTeamIds.includes(a.userId)) {
            return 1;
        }

        if (noveltyTeamIds.includes(b.userId)) {
            return -1;
        }

        return a.name.localeCompare(b.name);
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
            preseason: doc.configuration.preseason,
            postseason: doc.configuration.postseason,
        },
    };
}
