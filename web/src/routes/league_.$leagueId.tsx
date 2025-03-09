import { createFileRoute, redirect } from '@tanstack/react-router';
import { League } from '../pages/League';
import { LeagueContextProvider } from '../context/LeagueContextProvider';

export const Route = createFileRoute('/league_/$leagueId')({
    component: LeagueComponent,
    beforeLoad: ({ context, location }) => {
        if (!context.isAuthenticated) {
            throw redirect({
                to: '/signIn',
                search: { path: location.pathname },
            });
        }
    },
});

function LeagueComponent() {
    const { leagueId } = Route.useParams();
    return (
        <LeagueContextProvider leagueId={leagueId}>
            <League />
        </LeagueContextProvider>
    );
}
