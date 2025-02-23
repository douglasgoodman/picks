import { createFileRoute } from '@tanstack/react-router';
import { League } from '../pages/League';
import { LeagueContextProvider } from '../context/LeagueContextProvider';

export const Route = createFileRoute('/league_/$leagueId')({
    component: LeagueComponent,
});

function LeagueComponent() {
    const { leagueId } = Route.useParams();
    return (
        <LeagueContextProvider leagueId={leagueId}>
            <League />
        </LeagueContextProvider>
    );
}
