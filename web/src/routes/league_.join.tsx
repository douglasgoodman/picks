import { createFileRoute } from '@tanstack/react-router';
import { JoinLeague } from '../pages/JoinLeague';

export const Route = createFileRoute('/league_/join')({
    component: JoinLeague,
});
