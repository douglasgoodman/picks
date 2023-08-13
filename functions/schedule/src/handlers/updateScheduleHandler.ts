import { getScheduleAsSeasonDocument } from './getSchedule';
import { putSeasonDocument } from '../services';

export async function updateScheduleHandler(): Promise<void> {
    const season = await getScheduleAsSeasonDocument();
    return putSeasonDocument(season);
}
