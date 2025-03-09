import { createFileRoute, redirect } from '@tanstack/react-router';
import { JoinLeagueWithId } from '../pages/JoinLeagueWithId';
import { LeagueContextProvider } from '../context/LeagueContextProvider';

export const Route = createFileRoute('/league_/$leagueId_/join')({
    component: JoinLeagueComponent,
    beforeLoad: ({ context, location }) => {
        if (!context.isAuthenticated) {
            throw redirect({
                to: '/signIn',
                search: { path: location.pathname },
            });
        }
    },
});

function JoinLeagueComponent() {
    const { leagueId } = Route.useParams();
    return (
        <LeagueContextProvider leagueId={leagueId} getNameOnly>
            <JoinLeagueWithId />
        </LeagueContextProvider>
    );
}
