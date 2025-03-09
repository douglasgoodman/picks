import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Game } from '@picks/types';

export interface ScoreCellProps {
    game: Game;
}

export const ScoreCell: React.FC<ScoreCellProps> = ({ game }) => {
    return (
        <Stack alignItems="center">
            <Typography variant="h5">{`${game.away_score} - ${game.home_score}`}</Typography>
            <Typography>
                {game.status === 'complete' ? 'Final' : '...'}
            </Typography>
        </Stack>
    );
};
