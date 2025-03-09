import { useAsyncCallback } from 'react-async-hook';
import { api } from '../api/api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export const useJoinLeague = (leagueId?: string) => {
    const [alertText, setAlertText] = useState<string>();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (shouldRedirect && leagueId) {
            setTimeout(
                () =>
                    navigate({
                        to: '/league/$leagueId',
                        params: { leagueId: leagueId },
                    }),
                3000,
            );
        }
    }, [shouldRedirect, leagueId, navigate]);

    const joinLeagueCallback = useAsyncCallback(api.league.join, {
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                if (error.status === 404) {
                    setAlertText('League not found');
                } else if (
                    error.status === 400 &&
                    error.response?.data.message === 'League is full'
                ) {
                    setAlertText(
                        'This league is full! Contact the owner to add more players.',
                    );
                } else if (error.status === 409) {
                    setAlertText(
                        'You are already a member of this league, redirecting...',
                    );
                    setShouldRedirect(true);
                } else {
                    setAlertText('An error occurred');
                }
            } else {
                throw error;
            }
        },
        onSuccess: () => {
            setAlertText('Success! Redirecting...');
            setShouldRedirect(true);
        },
    });

    return {
        join: () => {
            if (leagueId) {
                joinLeagueCallback.execute(leagueId);
            }
        },
        loading: joinLeagueCallback.loading || shouldRedirect,
        alertText,
        shouldRedirect,
    };
};
