interface Config {
    apiDomain: string;
    webDomain: string;
    port: number;
    googleOauthClient: {
        id: string;
        secret: string;
    };
    aws: {
        region: string;
    };
    session: {
        secret: string;
    };
    mongodb: {
        connectionString: string;
        dbName: string;
    };
}

export const config: Config = {
    apiDomain: `api.${process.env.DOMAIN!}`,
    webDomain: `www.${process.env.DOMAIN!}`,
    port: +process.env.API_PORT!,
    googleOauthClient: {
        id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
        secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    },
    aws: {
        region: process.env.AWS_REGION!,
    },
    session: {
        secret: process.env.SESSION_SECRET!,
    },
    mongodb: {
        connectionString: process.env.MONGODB_CONNECTION_STRING!,
        dbName: process.env.MONGODB_DB_NAME!,
    },
};
