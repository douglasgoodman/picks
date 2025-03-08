import { ObjectId } from 'mongodb';

export interface PicksDocument {
    _id: ObjectId;
    leagueId: string;
    teamId: string;
    eventId: string;
}
