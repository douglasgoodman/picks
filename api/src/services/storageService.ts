import { SeasonDocument, UserDocument } from '@picks/types';
import { config } from '../config';
import { Filter, MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING!);

export async function getSeasonDocument(): Promise<SeasonDocument> {
    try {
        await client.connect();
        const result = await client
            .db('globaldata')
            .collection<SeasonDocument>('seasons')
            .findOne({ year: 2023 });
        console.log('result:', JSON.stringify(result));
        return result as SeasonDocument;
    } catch (error) {
        console.error(
            `Error getting season document from MongoDB: ${JSON.stringify(
                error
            )}`
        );
        throw error;
    }
}

export async function getUserDocument(id: string): Promise<UserDocument> {
    try {
        await client.connect();
        const result = await client
            .db('globaldata')
            .collection<UserDocument>('users')
            .findOne({ _id: id });
        console.log('result:', JSON.stringify(result));
        return result as UserDocument;
    } catch (error) {
        console.error(
            `Error getting user document from MongoDB: ${JSON.stringify(error)}`
        );
        throw error;
    }
}

export async function putUserDocument(
    userDocument: UserDocument
): Promise<void> {
    try {
        await client.connect();
        const result = await client
            .db('globaldata')
            .collection<UserDocument>('users')
            .updateOne(
                { _id: userDocument._id! },
                { $set: userDocument },
                { upsert: true }
            );
        console.log('result:', JSON.stringify(result));
    } catch (error) {
        console.error(
            `Error updating user in MongoDB: ${JSON.stringify(error)}`
        );
        throw error;
    }
}
