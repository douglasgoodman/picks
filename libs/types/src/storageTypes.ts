export interface SeasonDocument {
    isCurrent: boolean;
    year: number;
    weeks: Week[];
}

export interface Week {
    number: string;
    isPreseason: boolean;
    isRegularSeason: boolean;
    isPostseason: boolean;
    games: Game[];
}

export type GameStatus = 'future' | 'inProgress' | 'complete';

export interface Game {
    id: string;
    dateTime: string; // "2022-08-01T07:00Z"
    status: GameStatus;
    home: Team;
    away: Team;
    homeScore?: number;
    awayScore?: number;
    odds?: Odds;
}

export interface Team {
    name: string;
    abbreviation: string;
    imageUrl: string;
}

export interface Odds {
    details: string;
    homeSpread: number;
    awaySpread: number;
    overUnder: number;
}

export interface UserDocument {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    userImageUrl?: string;
}
