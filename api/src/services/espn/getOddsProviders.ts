const url =
    'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/providers?limit=100';

export async function getOddsProviders() {
    const response = await fetch(url, { method: 'GET' });
    const providers = (await response.json()) as { items: { $ref: string }[] };
    const result = [];
    for (const { $ref: url } of providers.items) {
        const res = await fetch(url, { method: 'GET' });
        const provider = (await res.json()) as {
            $ref: string;
            name: string;
            id: string;
        };
        if (provider.name !== 'Not Available' && provider.name !== 'unknown') {
            result.push(provider);
        }
    }
    return result;
}
