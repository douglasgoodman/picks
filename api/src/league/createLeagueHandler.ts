import {
    LeagueCreateResponse,
    LeagueCreateRequest,
    LeagueDto,
    NoveltyTeam,
} from '@picks/api-sdk';
import { RequestHandler } from 'express';
import {
    uniqueNamesGenerator,
    Config,
    names,
    adjectives,
    colors,
    animals,
} from 'unique-names-generator';
import {
    doesLeagueExist,
    putLeagueDocument,
} from '../services/storage/league.js';
import { getOddsProviderDocument } from '../services/storage/oddsProviders.js';
import { LeagueDocument } from '@picks/types';

const nameGeneratorConfig: Config = {
    dictionaries: [names, ['the'], adjectives, colors, animals],
    separator: '-',
    length: 5,
};

export const createLeagueHandler: RequestHandler<
    unknown,
    LeagueCreateResponse,
    LeagueCreateRequest,
    unknown
> = async (req, res) => {
    if (!req.session?.user?.id) {
        res.sendStatus(401);
        return;
    }

    let name = '';
    do {
        name = uniqueNamesGenerator(nameGeneratorConfig).toLowerCase();
    } while ((await doesLeagueExist(name)).exists);

    const league = req.body;
    const document: LeagueDocument = {
        _id: name,
        creator_id: req.session.user.id,
        name: league.name,
        member_ids: [req.session.user.id],
        admin_ids: [req.session.user.id],
        teams: [],
        configuration: {
            max_teams: league.maxTeams,
            novelty_teams: league.noveltyTeams,
            preseason: league.preseason,
            postseason: league.postseason,
        },
    };

    if (league.noveltyTeams.includes(NoveltyTeam.Favorite)) {
        document.teams.push({
            user_id: NoveltyTeam.Favorite,
            name: 'I always pick favorites',
        });
    }

    if (league.noveltyTeams.includes(NoveltyTeam.Random)) {
        document.teams.push({
            user_id: NoveltyTeam.Random,
            name: 'I pick randomly',
        });
    }

    if (league.oddsProviderId) {
        const oddsProvider = await getOddsProviderDocument(
            league.oddsProviderId,
        );
        document.configuration.odds_provider = {
            id: oddsProvider._id,
            name: oddsProvider.name,
        };
    }

    await putLeagueDocument(document);
    const createResponse: LeagueCreateResponse = { id: name };
    res.send(createResponse);
};
