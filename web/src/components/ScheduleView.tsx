import Tabs from '@mui/material/Tabs';
import { useScheduleContext } from '../context/ScheduleContext';
import Tab from '@mui/material/Tab';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { useMemo, useState } from 'react';
import { useLeagueContext } from '../context/LeagueContext';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import { WeekTable } from './WeekTable';

type SeasonPart = 'preseason' | 'regular' | 'postseason';

export const ScheduleView: React.FC = () => {
    const {
        schedule: { weeks },
    } = useScheduleContext();
    const { league } = useLeagueContext();
    const [seasonPart, setSeasonPart] = useState<SeasonPart>('regular');
    const [selectedWeekNumber, setSelectedWeekNumber] = useState(0);

    const handleSeasonPartChange = (_: unknown, newValue: SeasonPart) => {
        if (newValue !== null) {
            setSeasonPart(newValue);
            setSelectedWeekNumber(0);
        }
    };

    const handleTabChange = (_: unknown, newValue: number) => {
        setSelectedWeekNumber(newValue);
    };

    const filteredWeeks = useMemo(
        () =>
            weeks.filter(
                (w) =>
                    w.games.length > 0 &&
                    ((seasonPart === 'preseason' && w.is_preseason) ||
                        (seasonPart === 'regular' && w.is_regular_season) ||
                        (seasonPart === 'postseason' && w.is_postseason)),
            ),
        [seasonPart, weeks],
    );

    return (
        <Stack spacing={3}>
            <ToggleButtonGroup
                exclusive
                value={seasonPart}
                onChange={handleSeasonPartChange}
            >
                {league.configuration.preseason && (
                    <ToggleButton value="preseason">Preseason</ToggleButton>
                )}
                <ToggleButton value="regular">Regular season</ToggleButton>
                {league.configuration.postseason && (
                    <ToggleButton value="postseason">Postseason</ToggleButton>
                )}
            </ToggleButtonGroup>
            <Tabs
                value={selectedWeekNumber}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
            >
                {filteredWeeks.map((week) => (
                    <Tooltip key={week.number} title={week.detail}>
                        <Tab
                            label={week.label}
                            id={`tab-week-${week.number}`}
                        />
                    </Tooltip>
                ))}
            </Tabs>
            <Box>
                <WeekTable week={filteredWeeks[selectedWeekNumber]} />
            </Box>
        </Stack>
    );
};
