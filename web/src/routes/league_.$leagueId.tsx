import { createFileRoute } from '@tanstack/react-router';
import { League } from '../pages/League';

export const Route = createFileRoute('/league_/$leagueId')({
    component: League,
});
