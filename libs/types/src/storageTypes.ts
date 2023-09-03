import { ObjectId } from 'mongodb';

export interface SeasonDocument {
    _id?: ObjectId;
    year: number;
    is_current: boolean;
    weeks: Week[];
}

export interface Week {
    number: string;
    is_preseason: boolean;
    is_regular_season: boolean;
    is_postseason: boolean;
    games: Game[];
}

export type GameStatus = 'future' | 'inProgress' | 'complete';

export interface Game {
    id: string;
    date_time: Date;
    status: GameStatus;
    home: Team;
    away: Team;
    home_score?: number;
    away_score?: number;
    odds?: Odds;
}

export interface Team {
    name: string;
    abbreviation: string;
    image_url: string;
}

export interface Odds {
    details: string;
    home_spread: number;
    away_spread: number;
    over_under: number;
}

export interface UserDocument {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    user_image_url?: string;
}
