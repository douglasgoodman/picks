import { LeagueDocument } from '@picks/types';
import {
    getDocument,
    getMultipleDocuments,
    putDocument,
    updateDocument,
} from './mongoDb.js';

const colectionName = 'leagues';

export async function getLeagueDocument(id: string): Promise<LeagueDocument> {
    return await getDocument<LeagueDocument>(colectionName, { _id: id });
}

export async function getLeagueDocuments(
    id: string,
): Promise<LeagueDocument[]> {
    return await getMultipleDocuments<LeagueDocument>(colectionName, {
        member_ids: id,
    });
}

export async function putLeagueDocument(
    document: LeagueDocument,
): Promise<void> {
    return await putDocument<LeagueDocument>(colectionName, document);
}

export async function addLeagueMember(id: string, user_id: string) {
    updateDocument<LeagueDocument>(
        colectionName,
        { _id: id },
        { $push: { member_ids: user_id } },
    );
}
