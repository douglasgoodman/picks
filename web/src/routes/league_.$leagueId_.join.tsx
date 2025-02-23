import { createFileRoute } from '@tanstack/react-router';
import { JoinLeagueWithId } from '../pages/JoinLeagueWithId';
import { LeagueContextProvider } from '../context/LeagueContextProvider';

export const Route = createFileRoute('/league_/$leagueId_/join')({
    component: JoinLeagueComponent,
});

function JoinLeagueComponent() {
    const { leagueId } = Route.useParams();
    return (
        <LeagueContextProvider leagueId={leagueId}>
            <JoinLeagueWithId />
        </LeagueContextProvider>
    );
}
