import { createFileRoute, redirect } from '@tanstack/react-router';
import { CreateLeague } from '../pages/CreateLeague';

export const Route = createFileRoute('/league_/create')({
    component: CreateLeague,
    beforeLoad: ({ context, location }) => {
        if (!context.isAuthenticated) {
            throw redirect({
                to: '/signIn',
                search: { path: location.pathname },
            });
        }
    },
});
