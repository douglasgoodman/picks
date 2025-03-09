import { PropsWithChildren } from 'react';
import { ScheduleContext } from './ScheduleContext';
import { useAsync } from 'react-async-hook';
import { api } from '../api/api';
import Skeleton from '@mui/material/Skeleton';

interface Props extends PropsWithChildren {
    leagueId: string;
    year?: number;
}

export const ScheduleContextProvider: React.FC<Props> = ({
    leagueId,
    year,
    children,
}) => {
    const getScheduleCallback = useAsync(api.espn.getSchedule, [
        leagueId,
        year,
    ]);

    if (
        getScheduleCallback.loading ||
        getScheduleCallback.status === 'not-requested'
    ) {
        return <Skeleton></Skeleton>;
    }

    if (!getScheduleCallback.result) {
        return <>Could not load season schedule!</>;
    }

    return (
        <ScheduleContext
            value={{ schedule: getScheduleCallback.result.schedule }}
        >
            {children}
        </ScheduleContext>
    );
};
