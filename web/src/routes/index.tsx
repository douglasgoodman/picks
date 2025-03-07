import { createFileRoute } from '@tanstack/react-router';
import { Home } from '../pages/Home';
import { useAuthContext } from '../context/AuthContext';
import { LeaguesContextProvider } from '../context/LeaguesContextProvider';
import { LeagueHome } from '../pages/LeagueHome';

export const Route = createFileRoute('/')({
    component: IndexComponent,
});

function IndexComponent() {
    const { isAuthenticated } = useAuthContext();
    if (isAuthenticated) {
        return (
            <LeaguesContextProvider>
                <LeagueHome />
            </LeaguesContextProvider>
        );
    } else {
        return <Home />;
    }
}
