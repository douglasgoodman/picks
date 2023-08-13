import { LeagueCreateResponse } from '@picks/api-sdk';
import { RequestHandler } from 'express';
import {
    uniqueNamesGenerator,
    Config,
    names,
    adjectives,
    colors,
    animals,
} from 'unique-names-generator';

const nameGeneratorConfig: Config = {
    dictionaries: [names, ['the'], adjectives, colors, animals],
    separator: '-',
    length: 5,
};

export const createLeagueHandler: RequestHandler = async (req, res) => {
    if (!req.session?.user?.id) {
        res.status(401).send('Unauthorized');
        return;
    }

    const name = uniqueNamesGenerator(nameGeneratorConfig).toLowerCase();
    console.log(name);
    const createResponse: LeagueCreateResponse = { id: name };
    res.status(200).send(createResponse);
};
