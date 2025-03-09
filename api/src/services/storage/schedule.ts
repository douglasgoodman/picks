import { SeasonDocument } from '@picks/types';
import { getDocument, insertDocument } from './mongoDb.js';

const collectionName = 'schedules';

export async function getScheduleDocument(
    year: number,
): Promise<SeasonDocument> {
    return await getDocument<SeasonDocument>(collectionName, { year: year });
}

export async function insertScheduleDocument(document: SeasonDocument) {
    return await insertDocument(collectionName, document);
}
