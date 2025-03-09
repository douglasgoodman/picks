import { PickDocument } from '@picks/types';
import {
    deleteDocument,
    getDocument,
    getMultipleDocuments,
    insertDocument,
    putDocument,
} from './mongoDb.js';
import { Filter, ObjectId, OptionalUnlessRequiredId } from 'mongodb';

const collectionName = 'picks';

export async function insertPickDocument(
    document: OptionalUnlessRequiredId<PickDocument>,
): Promise<void> {
    return await insertDocument<PickDocument>(collectionName, document);
}

export async function getPickDocument(id: string): Promise<PickDocument> {
    return await getDocument<PickDocument>(collectionName, {
        _id: new ObjectId(id),
    });
}

export async function getPicksDocuments(
    leagueId: string,
    teamId?: string,
    eventId?: string,
): Promise<PickDocument[]> {
    const filter: Filter<PickDocument> = {
        $and: [{ league_id: leagueId }],
    };
    if (teamId) {
        filter.$and = [{ league_id: leagueId, team_id: teamId }];
    }
    if (teamId && eventId) {
        filter.$and = [
            { league_id: leagueId, team_id: teamId, event_id: eventId },
        ];
    }
    return await getMultipleDocuments<PickDocument>(collectionName, filter);
}

export async function updatePickDocument(document: PickDocument) {
    return await putDocument<PickDocument>(collectionName, document);
}

export async function deletePickDocument(id: string) {
    return await deleteDocument<PickDocument>(collectionName, {
        _id: new ObjectId(id),
    });
}
