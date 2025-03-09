import { createFileRoute, redirect } from '@tanstack/react-router';
import { JoinLeague } from '../pages/JoinLeague';

export const Route = createFileRoute('/league_/join')({
    component: JoinLeague,
    beforeLoad: ({ context, location }) => {
        if (!context.isAuthenticated) {
            throw redirect({
                to: '/signIn',
                search: { path: location.pathname },
            });
        }
    },
});
