import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Game } from '@picks/types';
import dayjs from 'dayjs';

export interface GameCellProps {
    game: Game;
}

export const GameCell: React.FC<GameCellProps> = ({ game }) => {
    return (
        <Stack alignItems="center">
            <Stack direction="row" spacing={1}>
                <Box
                    component="img"
                    src={game.away.image_url}
                    sx={{ height: 24, width: 24 }}
                />
                <Typography>{`${game.away.abbreviation} at ${game.home.abbreviation}`}</Typography>
                <Box
                    component="img"
                    src={game.home.image_url}
                    sx={{ height: 24, width: 24 }}
                />
            </Stack>
            <Typography variant="caption">
                {dayjs(game.date_time).format('ddd MMM D h:mm A')}
            </Typography>
        </Stack>
    );
};
