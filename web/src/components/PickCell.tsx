import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface PickCellProps {
    leagueId: string;
    teamId: string;
    eventId: string;
}

export const PickCell: React.FC<PickCellProps> = ({
    leagueId,
    teamId,
    eventId,
}) => {
    return (
        <Stack>
            <Typography variant="caption">{leagueId}</Typography>
            <Typography variant="caption">{teamId}</Typography>
            <Typography variant="caption">{eventId}</Typography>
        </Stack>
    );
};
