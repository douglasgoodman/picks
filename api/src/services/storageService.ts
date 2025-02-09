import { SeasonDocument, UserDocument, LeagueDocument } from '@picks/types';
import { config } from '../config.js';
import { Filter, MongoClient, ServerApiVersion } from 'mongodb';
import { getScheduleAsSeasonDocument } from '../handlers/getSchedule.js';

export async function getSeasonDocument(): Promise<SeasonDocument> {
    try {
        return await getScheduleAsSeasonDocument();

        // await client.connect();
        // const result = await client
        //     .db('globaldata')
        //     .collection<SeasonDocument>('seasons')
        //     .findOne({ year: 2023 });
        // console.log('result:', JSON.stringify(result));
        // return result as SeasonDocument;
    } catch (error) {
        console.error(
            `Error getting season document from ESPN: ${JSON.stringify(error)}`,
        );
        throw error;
    }
}
