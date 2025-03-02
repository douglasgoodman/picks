export interface LeagueDocument {
    _id: string;
    creator_id: string;
    name: string;
    member_ids: string[];
    admin_ids: string[];
    teams: { user_id: string; name: string }[];
    configuration: {
        max_teams: number;
        novelty_teams: string[];
        odds_provider?: {
            id: string;
            name: string;
        };
    };
}
