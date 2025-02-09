import {
    Document,
    MongoClient,
    ServerApiVersion,
    UpdateFilter,
    type Filter,
} from 'mongodb';

const dbName = 'picks-test';

const client = new MongoClient(process.env.MONGODB_CONNECTION_STRING!, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export async function getDocument<T extends Document>(
    collection: string,
    filter: Filter<T>,
): Promise<T> {
    try {
        await client.connect();
        const result = await client
            .db(dbName)
            .collection<T>(collection)
            .findOne(filter);
        console.log('result: ', JSON.stringify(result));
        return result as T;
    } catch (error) {
        console.error(
            `Error getting document from MongoDB: ${JSON.stringify(error)}`,
        );
        throw error;
    }
}

export async function getMultipleDocuments<T extends Document>(
    collection: string,
    filter: Filter<T>,
): Promise<T[]> {
    try {
        await client.connect();
        const cursor = client.db(dbName).collection<T>(collection).find(filter);
        const result = await cursor.toArray();
        console.log('result: ', JSON.stringify(result));
        return result as T[];
    } catch (error) {
        console.error(
            `Error getting documents from MongoDB: ${JSON.stringify(error)}`,
        );
        throw error;
    }
}

export async function putDocument<T extends Document>(
    collection: string,
    document: T,
): Promise<void> {
    try {
        await client.connect();
        const result = await client
            .db(dbName)
            .collection<T>(collection)
            .updateOne(
                { _id: document._id },
                { $set: document },
                { upsert: true },
            );
        console.log('result: ', JSON.stringify(result));
    } catch (error) {
        console.error(
            `Error updating document in MongoDB: ${JSON.stringify(error)}`,
        );
        throw error;
    }
}

export async function updateDocument<T extends Document>(
    collection: string,
    filter: Filter<T>,
    update: UpdateFilter<T>,
): Promise<void> {
    try {
        await client.connect();
        const result = await client
            .db(dbName)
            .collection<T>(collection)
            .updateOne(filter, update);
        console.log('result: ', JSON.stringify(result));
    } catch (error) {
        console.error(
            `Error updating document in MongoDB: ${JSON.stringify(error)}`,
        );
        throw error;
    }
}
