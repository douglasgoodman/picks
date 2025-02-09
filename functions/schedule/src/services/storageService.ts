import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { SeasonDocument } from '@picks/types';

export async function putSeasonDocument(season: SeasonDocument): Promise<void> {
    const dynamo = new DynamoDBClient({ region: 'us-east-1' });
    console.log('created dynamo db client');
    const documentClient = DynamoDBDocument.from(dynamo, {
        marshallOptions: { removeUndefinedValues: true },
    });
    console.log('created dynamo db document client');
    try {
        const response = await documentClient.put({
            TableName: 'pickem-seasons',
            Item: {
                year: season.year.toString(),
                season: season,
            },
        });
        console.log(
            `Put season document successful: ${JSON.stringify(response)}`
        );
    } catch (error) {
        console.error(
            `Error updating season in dynamodb: ${JSON.stringify(error)}`
        );
        throw error;
    } finally {
        documentClient.destroy();
        dynamo.destroy();
    }
}
