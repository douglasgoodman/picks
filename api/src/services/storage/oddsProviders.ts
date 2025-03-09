import { OddsProviderDocument } from '@picks/types';
import {
    getDocument,
    getMultipleDocuments,
    insertMultipleDocuments,
} from './mongoDb.js';

const collectionName = 'odds_providers';

export async function insertOddsProviderDocuments(
    documents: OddsProviderDocument[],
): Promise<void> {
    return await insertMultipleDocuments<OddsProviderDocument>(
        collectionName,
        documents,
    );
}

export async function getOddsProviderDocuments(): Promise<
    OddsProviderDocument[]
> {
    return await getMultipleDocuments<OddsProviderDocument>(collectionName, {});
}

export async function getOddsProviderDocument(
    id: string,
): Promise<OddsProviderDocument> {
    return await getDocument<OddsProviderDocument>(collectionName, { _id: id });
}
