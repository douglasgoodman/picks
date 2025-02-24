import { LeagueCreateResponse, LeagueCreateRequest } from '@picks/api-sdk';
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

    await putLeagueDocument({
        _id: name,
        creator_id: req.session.user.id,
        name: req.body.name,
        max_teams: req.body.maxTeams,
        member_ids: [req.session.user.id],
        teams: [],
    });
    const createResponse: LeagueCreateResponse = { id: name };
    res.status(200).send(createResponse);
};
