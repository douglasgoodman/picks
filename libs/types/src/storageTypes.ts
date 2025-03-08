import { ObjectId } from 'mongodb';

export interface SeasonDocument {
    _id?: ObjectId;
    year: number;
    is_current: boolean;
    weeks: Week[];
    start_date: Date;
    end_date: Date;
}

export interface Week {
    number: string;
    label: string;
    detail: string;
    is_preseason: boolean;
    is_regular_season: boolean;
    is_postseason: boolean;
    games: Game[];
    start_date: Date;
    end_date: Date;
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
