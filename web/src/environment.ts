interface Environment {
    webDomain: string;
    apiDomain: string;
}

export const environment: Environment = {
    webDomain: `https://www.${import.meta.env.VITE_DOMAIN}`,
    apiDomain: `https://api.${import.meta.env.VITE_DOMAIN}`,
};
