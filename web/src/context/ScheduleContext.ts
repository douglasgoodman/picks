import { ScheduleDto } from '@picks/api-sdk';
import { createContext, useContext } from 'react';

export interface ScheduleContext {
    schedule: ScheduleDto;
}

export const ScheduleContext = createContext<ScheduleContext>(
    {} as ScheduleContext,
);

export function useScheduleContext() {
    return useContext(ScheduleContext);
}
