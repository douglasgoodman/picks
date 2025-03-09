import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { App } from '../App';
import { NoMatch } from '../pages/NoMatch';

interface RouterContext {
    isAuthenticated: boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <>
            <App>
                <Outlet />
            </App>
            <TanStackRouterDevtools />
        </>
    ),
    notFoundComponent: NoMatch,
});
