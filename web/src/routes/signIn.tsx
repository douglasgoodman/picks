import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignIn } from '../pages/SignIn';

interface SignInSearchParams {
    path?: string;
}

export const Route = createFileRoute('/signIn')({
    component: SignIn,
    validateSearch: (search: Record<string, unknown>): SignInSearchParams => {
        return { path: search?.path as string };
    },
    beforeLoad: ({ context }) => {
        if (context.isAuthenticated) {
            throw redirect({ to: '/' });
        }
    },
});
