import {
    Document,
    MongoClient,
    ObjectId,
    OptionalUnlessRequiredId,
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

export async function doesDocumentExist<T extends Document>(
    collection: string,
    filter: Filter<T>,
): Promise<{ exists: boolean }> {
    try {
        await client.connect();
        const result = await client
            .db(dbName)
            .collection<T>(collection)
            .countDocuments(filter, { limit: 1 });
        return { exists: result > 0 };
    } catch (error) {
        console.error(
            `Error checking if document already exists in MongoDB: ${JSON.stringify(error)}`,
        );
        throw error;
    }
}

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
        return result as T[];
    } catch (error) {
        console.error(
            `Error getting documents from MongoDB: ${JSON.stringify(error)}`,
        );
        throw error;
    }
}

export async function insertDocument<T extends Document>(
    collection: string,
    document: OptionalUnlessRequiredId<T>,
): Promise<void> {
    try {
        await client.connect();
        await client
            .db(dbName)
            .collection<T>(collection)
            .insertOne(document, { forceServerObjectId: true });
    } catch (error) {
        console.error(
            `Error updating document in MongoDB: ${JSON.stringify(error)}`,
        );
        throw error;
    }
}

export async function insertMultipleDocuments<T extends Document>(
    collection: string,
    documents: OptionalUnlessRequiredId<T>[],
): Promise<void> {
    try {
        await client.connect();
        await client.db(dbName).collection<T>(collection).insertMany(documents);
    } catch (error) {
        console.error(
            `Error updating document in MongoDB: ${JSON.stringify(error)}`,
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
    } catch (error) {
        console.error(
            `Error updating document in MongoDB: ${JSON.stringify(error)}`,
        );
        throw error;
    }
}

export async function deleteDocument<T extends Document>(
    collection: string,
    filter: Filter<T>,
): Promise<void> {
    try {
        console.log('got here');
        await client.connect();
        await client.db(dbName).collection<T>(collection).deleteOne(filter);
    } catch (error) {
        console.error(
            `Error deleting document in MongoDB: ${JSON.stringify(error)}`,
        );
        throw error;
    }
}
