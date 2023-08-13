interface Environment {
    webDomain: string;
    apiDomain: string;
}

export const environment: Environment = {
    webDomain: `https://www.${process.env.DOMAIN}`,
    apiDomain: `https://api.${process.env.DOMAIN}`,
};
