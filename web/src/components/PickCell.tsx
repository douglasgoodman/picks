import Typography from '@mui/material/Typography';
import { usePicksContext } from '../context/PicksContext';
import { useMemo, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Skeleton from '@mui/material/Skeleton';
import DeleteIcon from '@mui/icons-material/Delete';

export interface PickCellProps {
    leagueId: string;
    teamId: string;
    eventId: string;
    home: string;
    away: string;
    homeSpread?: number;
    awaySpread?: number;
}

export const PickCell: React.FC<PickCellProps> = ({
    leagueId,
    teamId,
    eventId,
    home,
    away,
    homeSpread,
    awaySpread,
}) => {
    const { picks, create, update, deletePick, isLoading } = usePicksContext();
    const { user } = useAuthContext();
    const [editMode, setEditMode] = useState(false);

    const pick = useMemo(
        () =>
            picks.find(
                (p) =>
                    p.leagueId === leagueId &&
                    p.teamId === teamId &&
                    p.eventId === eventId,
            ),
        [picks, leagueId, teamId, eventId],
    );

    const handleWinnerChange = (_: unknown, newValue: string) => {
        const spread = newValue === home ? homeSpread : awaySpread;
        if (!pick) {
            create(leagueId, teamId, eventId, newValue, false, spread);
        } else {
            if (newValue === 'delete') {
                deletePick(pick.id);
            } else {
                update(pick.id, newValue, pick.locked, spread, pick.funnyName);
            }
        }
        setEditMode(false);
    };

    const handleEdit = (_: unknown, newValue: string) => {
        if (!pick) {
            return;
        }
        if (newValue === 'edit') {
            setEditMode(true);
        } else if (newValue === 'lock') {
            update(pick.id, pick.winner, true, pick.spread, pick.funnyName);
        } else if (newValue === 'unlock') {
            update(pick.id, pick.winner, false, pick.spread, pick.funnyName);
        }
    };

    if (isLoading) {
        return <Skeleton />;
    }

    if (teamId !== user.id) {
        return pick ? (
            <Typography>{pick.funnyName ?? pick.winner}</Typography>
        ) : null;
    }

    if (!pick || editMode) {
        return (
            <ToggleButtonGroup
                disabled={isLoading}
                size="medium"
                exclusive
                onChange={handleWinnerChange}
            >
                <ToggleButton value={away}>{away}</ToggleButton>
                <ToggleButton value={home}>{home}</ToggleButton>
                {pick && (
                    <ToggleButton value="delete">
                        <DeleteIcon fontSize="small" />
                    </ToggleButton>
                )}
            </ToggleButtonGroup>
        );
    }

    if (pick) {
        return (
            <ToggleButtonGroup
                size="medium"
                exclusive
                onChange={handleEdit}
                disabled={isLoading}
            >
                <ToggleButton value={pick.winner} disabled>
                    {pick.funnyName ?? pick.winner}
                </ToggleButton>
                {!pick.locked && (
                    <ToggleButton value="edit">
                        <EditIcon fontSize="small" />
                    </ToggleButton>
                )}
                {pick.locked ? (
                    <ToggleButton value="unlock">
                        <LockOpenIcon fontSize="small" />
                    </ToggleButton>
                ) : (
                    <ToggleButton value="lock">
                        <LockIcon fontSize="small" />
                    </ToggleButton>
                )}
            </ToggleButtonGroup>
        );
    }
};
