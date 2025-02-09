import { createFileRoute } from '@tanstack/react-router';
import { JoinLeagueWithId } from '../pages/JoinLeagueWithId';

export const Route = createFileRoute('/league_/$leagueId_/join')({
    component: JoinLeagueWithId,
});
