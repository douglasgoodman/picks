import { SeasonDocument } from '@picks/types';
import { getScheduleAsSeasonDocument } from '../handlers/getSchedule.js';
import { insertScheduleDocument } from './storage/schedule.js';

export async function getSeasonDocument(): Promise<SeasonDocument> {
    try {
        const season = await getScheduleAsSeasonDocument();

        await insertScheduleDocument(season);
        return season;
    } catch (error) {
        console.error(
            `Error getting season document from ESPN: ${JSON.stringify(error)}`,
        );
        throw error;
    }
}
