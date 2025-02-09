import { createFileRoute } from '@tanstack/react-router';
import { CreateLeague } from '../pages/CreateLeague';

export const Route = createFileRoute('/league_/create')({
    component: CreateLeague,
});
