import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import { useAuthContext } from './context/AuthContext';
import { AuthContextProvider } from './context/AuthContextProvider';

const router = createRouter({ routeTree, context: { isAuthenticated: false } });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

function InnerRouter() {
    const { isAuthenticated } = useAuthContext();
    return <RouterProvider router={router} context={{ isAuthenticated }} />;
}

export const Router: React.FC = () => (
    <AuthContextProvider>
        <InnerRouter />
    </AuthContextProvider>
);
