import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { SeasonDocument, UserDocument } from '@picks/types';
import { config } from '../config';

export async function getSeasonDocument(): Promise<SeasonDocument> {
    const dynamo = new DynamoDBClient({ region: config.aws.region });
    const documentClient = DynamoDBDocument.from(dynamo, {
        marshallOptions: { removeUndefinedValues: true },
    });
    try {
        const response = await documentClient.get({
            TableName: 'pickem-seasons',
            Key: {
                year: '2022',
            },
        });
        console.log(
            `Get season document successful: ${JSON.stringify(response)}`
        );
        return response.Item as SeasonDocument;
    } catch (error) {
        console.error(
            `Error getting season document from dynamodb: ${JSON.stringify(
                error
            )}`
        );
        throw error;
    } finally {
        documentClient.destroy();
        dynamo.destroy();
    }
}

export async function getUserDocument(id: string): Promise<UserDocument> {
    const dynamo = new DynamoDBClient({ region: config.aws.region });
    const documentClient = DynamoDBDocument.from(dynamo, {
        marshallOptions: { removeUndefinedValues: true },
    });
    try {
        const response = await documentClient.get({
            TableName: 'pickem-users',
            Key: {
                id,
            },
        });
        console.log('Get user document successful');
        return response.Item?.user as UserDocument;
    } catch (error) {
        console.error(
            `Error getting user document from dynamodb: ${JSON.stringify(
                error
            )}`
        );
        throw error;
    } finally {
        documentClient.destroy();
        dynamo.destroy();
    }
}

export async function putUserDocument(
    userDocument: UserDocument
): Promise<void> {
    const dynamo = new DynamoDBClient({ region: config.aws.region });
    const documentClient = DynamoDBDocument.from(dynamo, {
        marshallOptions: { removeUndefinedValues: true },
    });
    try {
        const response = await documentClient.put({
            TableName: 'pickem-users',
            Item: {
                id: userDocument.id,
                user: userDocument,
            },
        });
        console.log(
            `Put user document successful: ${JSON.stringify(response)}`
        );
    } catch (error) {
        console.error(
            `Error updating user in dynamodb: ${JSON.stringify(error)}`
        );
        throw error;
    } finally {
        documentClient.destroy();
        dynamo.destroy();
    }
}
