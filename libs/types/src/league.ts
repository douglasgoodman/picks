export interface LeagueDocument {
    _id: string;
    creator_id: string;
    name: string;
    max_teams: number;
    member_ids: string[];
    teams: { user_id: string; name: string }[];
}
