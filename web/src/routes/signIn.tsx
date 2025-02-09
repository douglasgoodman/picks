import { createFileRoute } from '@tanstack/react-router';
import { SignIn } from '../pages/SignIn';

export const Route = createFileRoute('/signIn')({
    component: SignIn,
});
