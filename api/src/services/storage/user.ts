import { UserDocument } from '@picks/types';
import { getDocument, getMultipleDocuments, putDocument } from './mongoDb.js';

const colectionName = 'users';

export async function getUserDocument(id: string): Promise<UserDocument> {
    return await getDocument<UserDocument>(colectionName, { _id: id });
}

export async function getUserDocuments(ids: string[]): Promise<UserDocument[]> {
    return await getMultipleDocuments<UserDocument>(colectionName, {
        _id: { $in: ids },
    });
}

export async function putUserDocument(document: UserDocument): Promise<void> {
    return await putDocument<UserDocument>(colectionName, document);
}
