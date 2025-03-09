import { SeasonDocument } from '@picks/types';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING!);

export async function putSeasonDocument(season: SeasonDocument): Promise<void> {
    try {
        await client.connect();
        const result = await client
            .db('globaldata')
            .collection<SeasonDocument>('seasons')
            .updateOne(
                { year: season.year },
                { $set: season },
                { upsert: true },
            );
    } catch (error) {
        console.error(
            `Error updating season in MongoDB: ${JSON.stringify(error)}`,
        );
        throw error;
    }
}
