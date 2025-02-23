import { createFileRoute } from '@tanstack/react-router';
import { LeagueHome } from '../pages/LeagueHome';
import { LeaguesContextProvider } from '../context/LeaguesContextProvider';

export const Route = createFileRoute('/league')({
    component: LeagueRoute,
});

function LeagueRoute() {
    return (
        <LeaguesContextProvider>
            <LeagueHome />
        </LeaguesContextProvider>
    );
}
