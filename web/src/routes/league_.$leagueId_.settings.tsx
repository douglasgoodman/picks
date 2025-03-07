import { createFileRoute, redirect } from '@tanstack/react-router';
import { LeagueContextProvider } from '../context/LeagueContextProvider';
import { LeagueSettings } from '../pages/LeagueSettings';

export const Route = createFileRoute('/league_/$leagueId_/settings')({
    component: LeagueSettingsComponent,
    beforeLoad: ({ context, location }) => {
        if (!context.isAuthenticated) {
            throw redirect({
                to: '/signIn',
                search: { path: location.pathname },
            });
        }
    },
});

function LeagueSettingsComponent() {
    const { leagueId } = Route.useParams();
    return (
        <LeagueContextProvider leagueId={leagueId}>
            <LeagueSettings />
        </LeagueContextProvider>
    );
}
