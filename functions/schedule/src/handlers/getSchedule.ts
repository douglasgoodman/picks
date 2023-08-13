import Axios from 'axios';
import {
    Game,
    GameStatus,
    Odds,
    SeasonDocument,
    Team,
    Week,
} from '@picks/types';

enum CalendarType {
    Preseason = '1',
    RegularSeason = '2',
    Postseason = '3',
}

const scoreboardUrl =
    'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';

const mgmOddsProviderId = 47;
const getOddsUrl = (eventId: string) =>
    `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${eventId}/competitions/${eventId}/odds/${mgmOddsProviderId}`;

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
    const { data: scoreboard } = await Axios.get<Scoreboard>(scoreboardUrl);

    const preseasonWeeks = await convertCalendarToWeeks(
        scoreboard.leagues[0].calendar.find(
            (c) => c.value === CalendarType.Preseason
        )!
    );
    const regularSeasonWeeks = await convertCalendarToWeeks(
        scoreboard.leagues[0].calendar.find(
            (c) => c.value === CalendarType.RegularSeason
        )!
    );
    const postseasonWeeks = await convertCalendarToWeeks(
        scoreboard.leagues[0].calendar.find(
            (c) => c.value === CalendarType.Postseason
        )!
    );

    const season: SeasonDocument = {
        isCurrent: true,
        year: scoreboard.season.year,
        weeks: [...preseasonWeeks, ...regularSeasonWeeks, ...postseasonWeeks],
    };

    return season;
}

async function convertCalendarToWeeks(calendar: Calendar): Promise<Week[]> {
    const weeks: Week[] = [];
    for (const week of calendar.entries) {
        const { data: weekScoreboard } = await Axios.get<Scoreboard>(
            `${scoreboardUrl}?seasontype=${calendar.value}&week=${week.value}`
        );

        const now = new Date();
        const getOdds =
            now > new Date(week.startDate) &&
            now < new Date(week.endDate) &&
            now.getDay() === 3;
        if (getOdds) {
            console.log("It's Wednesday, my dudes! Updating odds...");
        }

        const games: Game[] = [];

        for (const event of weekScoreboard.events) {
            const homeCompetitor = event.competitions[0].competitors.find(
                (c) => c.homeAway === 'home'
            )!;
            const awayCompetitor = event.competitions[0].competitors.find(
                (c) => c.homeAway === 'away'
            )!;

            let odds: Odds | undefined;
            if (getOdds) {
                const url = getOddsUrl(event.id);
                const { data: rawOdds } = await Axios.get<RawOdds>(url);
                odds = {
                    details: rawOdds.details,
                    overUnder: rawOdds.overUnder,
                    homeSpread: rawOdds.homeTeamOdds.favorite
                        ? rawOdds.spread
                        : rawOdds.spread * -1,
                    awaySpread: rawOdds.awayTeamOdds.favorite
                        ? rawOdds.spread
                        : rawOdds.spread * -1,
                };
            }

            games.push({
                id: event.id,
                dateTime: event.date,
                status: convertEventStatusToGameStatus(
                    event.competitions[0].status
                ),
                home: convertCompetitorToTeam(homeCompetitor),
                away: convertCompetitorToTeam(awayCompetitor),
                homeScore: +homeCompetitor.score,
                awayScore: +awayCompetitor.score,
                odds,
            });
        }

        weeks.push({
            number: week.value,
            isPreseason: calendar.value === CalendarType.Preseason,
            isRegularSeason: calendar.value === CalendarType.RegularSeason,
            isPostseason: calendar.value === CalendarType.Postseason,
            games,
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
        imageUrl: competitor.team.logo,
    };
}
