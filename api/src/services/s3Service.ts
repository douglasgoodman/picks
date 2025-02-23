import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    GetObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { UserRoute } from '@picks/api-sdk';
import axios from 'axios';
import { Readable } from 'node:stream';
import { config } from '../config.js';

const userImageBucket = 'pickem-user-images';

const getKey = (id: string) => `userimage/${id}`;

export async function uploadUserImage(
    id: string,
    imageUrl: string,
): Promise<string | undefined> {
    const client = new S3Client({ region: config.aws.region });

    try {
        const response = await axios.get(imageUrl, {
            responseEncoding: 'binary',
            responseType: 'arraybuffer',
        });
        const command = new PutObjectCommand({
            Bucket: userImageBucket,
            Key: getKey(id),
            Body: response.data,
        });
        await client.send(command);
        return `https://${config.apiDomain}${UserRoute.image}?id=${id}`;
    } catch (e) {
        console.error(e);
        return undefined;
    } finally {
        client.destroy();
    }
}

export async function getUserImage(id: string) {
    const client = new S3Client({ region: config.aws.region });

    try {
        const command = new GetObjectCommand({
            Bucket: userImageBucket,
            Key: getKey(id),
        });
        const response = await client.send(command);
        return response.Body as Readable;
    } catch (e) {
        console.error(e);
        return undefined;
    } finally {
        //client.destroy();
    }
}
