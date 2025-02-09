import { createFileRoute } from '@tanstack/react-router';
import { LeagueHome } from '../pages/LeagueHome';

export const Route = createFileRoute('/league')({
    component: LeagueHome,
});
