import { createFileRoute } from '@tanstack/react-router';
import { LeagueContextProvider } from '../context/LeagueContextProvider';
import { LeagueSettings } from '../pages/LeagueSettings';

export const Route = createFileRoute('/league_/$leagueId_/settings')({
    component: LeagueSettingsComponent,
});

function LeagueSettingsComponent() {
    const { leagueId } = Route.useParams();
    return (
        <LeagueContextProvider leagueId={leagueId}>
            <LeagueSettings />
        </LeagueContextProvider>
    );
}
