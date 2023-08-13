import React from 'react';
import { Route, Routes as ReactRoutes, Outlet } from 'react-router-dom';
import { League } from '../pages/League';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { NoMatch } from '../pages/NoMatch';
import { CreateLeague } from '../pages/CreateLeague';
import { JoinLeague } from '../pages/JoinLeague';

const Path = {
    home: '/',
    signIn: '/signin',
    league: '/league',
};

export const Routes: React.FC = () => {
    return (
        <ReactRoutes>
            <Route path={Path.home} element={<Home />} />
            <Route path={Path.signIn} element={<SignIn />} />
            <Route path={Path.league} element={<Outlet />}>
                <Route index element={<League />} />
                <Route path="create" element={<CreateLeague />} />
                <Route path="join" element={<JoinLeague />}>
                    <Route path=":id" element={<JoinLeague />} />
                </Route>
            </Route>
            <Route path="*" element={<NoMatch />} />
        </ReactRoutes>
    );
};
