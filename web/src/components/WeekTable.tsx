import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Week } from '@picks/types';
import { PropsWithChildren } from 'react';
import { useLeagueContext } from '../context/LeagueContext';
import { GameCell } from './GameCell';
import { ScoreCell } from './ScoreCell';
import { PickCell } from './PickCell';
import Typography from '@mui/material/Typography';

interface Props extends PropsWithChildren {
    week: Week;
}

export const WeekTable: React.FC<Props> = ({ week }) => {
    const { league } = useLeagueContext();

    const showScores = !!week.games.find((game) => game.status === 'complete');

    return (
        <TableContainer>
            <Table size="small" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" width="20%">
                            Game
                        </TableCell>
                        {league.configuration.oddsProvider && (
                            <TableCell align="center" width="10%">
                                Spread
                            </TableCell>
                        )}
                        {showScores && (
                            <TableCell align="center" width="15%">
                                Score
                            </TableCell>
                        )}
                        {league.teams.map((team) => (
                            <TableCell key={team.userId} align="center">
                                {team.name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {week.games.map((game) => (
                        <TableRow key={game.id}>
                            <TableCell align="center">
                                <GameCell game={game} />
                            </TableCell>
                            {league.configuration.oddsProvider && (
                                <TableCell align="center">
                                    <Typography>
                                        {game.odds?.details}
                                    </Typography>
                                </TableCell>
                            )}
                            <TableCell align="center">
                                <ScoreCell game={game} />
                            </TableCell>
                            {league.teams.map((team) => (
                                <TableCell key={team.userId} align="center">
                                    <PickCell
                                        leagueId={league.id}
                                        teamId={team.userId}
                                        eventId={game.id}
                                        home={game.home.abbreviation}
                                        away={game.away.abbreviation}
                                        homeSpread={game.odds?.home_spread}
                                        awaySpread={game.odds?.away_spread}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
