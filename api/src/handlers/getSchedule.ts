import {
    Game,
    GameStatus,
    Odds,
    SeasonDocument,
    Team,
    Week,
} from '@picks/types';
import Axios from 'axios';

export let callCount = 0;

enum CalendarType {
    Preseason = '1',
    RegularSeason = '2',
    Postseason = '3',
}

const scoreboardUrl =
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';

//const mgmOddsProviderId = 47;
const workingEspnOddsProvider = 58;
const getOddsUrl = (eventId: string) =>
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${eventId}/competitions/${eventId}/odds/${workingEspnOddsProvider}`;

interface EventStatus {
    type: {
        state: 'pre' | 'in' | 'post';
        completed: boolean;
        description: string;
    };
}

interface Calendar {
    label: string;
    value: string;
    entries: {
        label: string;
        detail: string;
        value: string;
        startDate: string;
        endDate: string;
    }[];
}

interface Competitor {
    homeAway: 'home' | 'away';
    team: {
        displayName: string;
        abbreviation: string;
        logo: string;
    };
    score: string;
}

interface Scoreboard {
    leagues: {
        season: { year: number; startDate: string; endDate: string };
        calendar: Calendar[];
    }[];
    season: { type: number; year: number };
    week: { number: number };
    events: {
        id: string;
        date: string;
        competitions: {
            type: { id: string; abbreviation: string };
            competitors: Competitor[];
            status: EventStatus;
        }[];
    }[];
}

interface TeamOdds {
    favorite: boolean;
    underdog: boolean;
}

interface RawOdds {
    details: string;
    overUnder: number;
    spread: number;
    awayTeamOdds: TeamOdds;
    homeTeamOdds: TeamOdds;
}

export async function getScheduleAsSeasonDocument(): Promise<SeasonDocument> {
    console.log('Start by getting the entire scoreboard');
    const { data: scoreboard } = await Axios.get<Scoreboard>(scoreboardUrl);
    callCount++;

    console.log('Now get the preseason weeks');
    const preseasonWeeks = await convertCalendarToWeeks(
        scoreboard.leagues[0].calendar.find(
            (c) => c.value === CalendarType.Preseason,
        )!,
    );

    console.log('Now get the regular season weeks');
    const regularSeasonWeeks = await convertCalendarToWeeks(
        scoreboard.leagues[0].calendar.find(
            (c) => c.value === CalendarType.RegularSeason,
        )!,
    );

    console.log('Now get the postseason weeks');
    const postseasonWeeks = await convertCalendarToWeeks(
        scoreboard.leagues[0].calendar.find(
            (c) => c.value === CalendarType.Postseason,
        )!,
    );

    console.log('Done!');

    const season: SeasonDocument = {
        is_current: true,
        year: scoreboard.season.year,
        weeks: [...preseasonWeeks, ...regularSeasonWeeks, ...postseasonWeeks],
        start_date: new Date(scoreboard.leagues[0].season.startDate),
        end_date: new Date(scoreboard.leagues[0].season.endDate),
    };

    return season;
}

async function convertCalendarToWeeks(calendar: Calendar): Promise<Week[]> {
    const weeks: Week[] = [];
    for (const week of calendar.entries) {
        const { data: weekScoreboard } = await Axios.get<Scoreboard>(
            `${scoreboardUrl}?seasontype=${calendar.value}&week=${week.value}`,
        );
        callCount++;

        const getOdds = true;

        const games: Game[] = [];

        for (const event of weekScoreboard.events) {
            if (event.competitions[0].type.id !== '1') {
                continue;
            }
            const homeCompetitor = event.competitions[0].competitors.find(
                (c) => c.homeAway === 'home',
            )!;
            const awayCompetitor = event.competitions[0].competitors.find(
                (c) => c.homeAway === 'away',
            )!;

            let odds: Odds | undefined;
            if (getOdds) {
                const url = getOddsUrl(event.id);
                try {
                    const { data: rawOdds } = await Axios.get<RawOdds>(url);
                    callCount++;
                    odds = {
                        details: rawOdds.details,
                        over_under: rawOdds.overUnder,
                        away_spread: rawOdds.awayTeamOdds.favorite
                            ? rawOdds.spread
                            : rawOdds.spread * -1,
                        home_spread: rawOdds.homeTeamOdds.favorite
                            ? rawOdds.spread
                            : rawOdds.spread * -1,
                    };
                } catch (e) {
                    console.log('error getting odds for ', event.id, e);
                }
            }

            games.push({
                id: event.id,
                date_time: new Date(event.date),
                status: convertEventStatusToGameStatus(
                    event.competitions[0].status,
                ),
                away: convertCompetitorToTeam(awayCompetitor),
                home: convertCompetitorToTeam(homeCompetitor),
                away_score: +awayCompetitor.score,
                home_score: +homeCompetitor.score,
                odds,
            });
        }

        weeks.push({
            number: week.value,
            label: week.label,
            detail: week.detail,
            is_preseason: calendar.value === CalendarType.Preseason,
            is_regular_season: calendar.value === CalendarType.RegularSeason,
            is_postseason: calendar.value === CalendarType.Postseason,
            games,
            start_date: new Date(week.startDate),
            end_date: new Date(week.endDate),
        });
    }

    return weeks;
}

function convertEventStatusToGameStatus(status: EventStatus): GameStatus {
    switch (status.type.state) {
        case 'pre':
            return 'future';
        case 'in':
            return 'inProgress';
        case 'post':
        default:
            return 'complete';
    }
}

function convertCompetitorToTeam(competitor: Competitor): Team {
    return {
        name: competitor.team.displayName,
        abbreviation: competitor.team.abbreviation,
        image_url: competitor.team.logo,
    };
}
