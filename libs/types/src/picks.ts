import { Document, ObjectId } from 'mongodb';

export interface PickDocument extends Document {
    _id?: ObjectId;
    league_id: string;
    team_id: string;
    event_id: string;
    winner: string;
    spread?: number;
    funny_name?: string;
    locked: boolean;
}
