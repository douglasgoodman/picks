import { LeagueDocument } from '@picks/types';
import {
    doesDocumentExist,
    getDocument,
    getMultipleDocuments,
    putDocument,
    updateDocument,
} from './mongoDb.js';

const collectionName = 'leagues';

export async function doesLeagueExist(
    id: string,
): Promise<{ exists: boolean }> {
    return await doesDocumentExist<LeagueDocument>(collectionName, { _id: id });
}

export async function getLeagueDocument(id: string): Promise<LeagueDocument> {
    return await getDocument<LeagueDocument>(collectionName, { _id: id });
}

export async function getLeagueDocuments(
    id: string,
): Promise<LeagueDocument[]> {
    return await getMultipleDocuments<LeagueDocument>(collectionName, {
        member_ids: id,
    });
}

export async function putLeagueDocument(
    document: LeagueDocument,
): Promise<void> {
    return await putDocument<LeagueDocument>(collectionName, document);
}

export async function addLeagueTeam(id: string, userId: string, name: string) {
    return await updateDocument<LeagueDocument>(
        collectionName,
        { _id: id },
        { $push: { teams: { user_id: userId, name: name } } },
    );
}

export async function addLeagueMember(id: string, user_id: string) {
    return await updateDocument<LeagueDocument>(
        collectionName,
        { _id: id },
        { $push: { member_ids: user_id } },
    );
}
