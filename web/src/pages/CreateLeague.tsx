import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import { environment } from '../environment';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { useTitle } from '../hooks/useTitle';
import Button from '@mui/material/Button';
import { useMemo, useState } from 'react';
import { api } from '../api/api';
import Slider from '@mui/material/Slider';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { NoveltyTeam } from '@picks/api-sdk';
import Autocomplete from '@mui/material/Autocomplete';
import { LeagueLink } from '../components/LeagueLink';
import Divider from '@mui/material/Divider';

const maxTeamsPossibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CreateLeague: React.FC = () => {
    useTitle('Create a league');
    const [leagueName, setLeagueName] = useState<string>();
    const [isAts, setIsAts] = useState(false);
    const [oddsProviderId, setOddsProviderId] = useState<string | null>(null);
    const [maxTeams, setMaxTeams] = useState<number>(4);
    const [includeFavoritesTeam, setIncludeFavoritesTeam] = useState(true);
    const [includeRandomTeam, setIncludeRandomTeam] = useState(true);
    const [leagueUrl, setLeagueUrl] = useState<string>();
    const [includePreseason, setIncludePreseason] = useState(false);
    const [includePostseason, setIncludePostseason] = useState(false);

    const getOddsProvidersCallback = useAsync(api.espn.getOddsProviders, []);

    const createLeagueCallback = useAsyncCallback(api.league.create, {
        onSuccess: (response) => {
            setLeagueUrl(`${environment.webDomain}/league/${response.id}/join`);
        },
    });

    const handleCreateButtonClick = async () => {
        const noveltyTeams = [];
        if (includeFavoritesTeam) {
            noveltyTeams.push(NoveltyTeam.Favorite);
        }
        if (includeRandomTeam) {
            noveltyTeams.push(NoveltyTeam.Random);
        }

        await createLeagueCallback.execute(
            leagueName!,
            maxTeams,
            noveltyTeams,
            includePreseason,
            includePostseason,
            isAts && oddsProviderId ? oddsProviderId : undefined,
        );
    };

    const selectedOddsProvider = useMemo(() => {
        const selected = getOddsProvidersCallback.result?.oddsProviders.find(
            (p) => p.id === oddsProviderId,
        );
        return { label: selected?.name ?? null, id: selected?.id ?? null };
    }, [getOddsProvidersCallback.result?.oddsProviders, oddsProviderId]);

    const isLoading =
        getOddsProvidersCallback.status === 'not-requested' ||
        getOddsProvidersCallback.loading ||
        createLeagueCallback.loading;

    if (createLeagueCallback.result && leagueUrl) {
        return (
            <LeagueLink
                leagueId={createLeagueCallback.result.id}
                leagueUrl={leagueUrl}
            />
        );
    }

    return (
        <Container sx={{ padding: '5rem' }} component={Paper}>
            <Container
                component="form"
                maxWidth="sm"
                onSubmit={(event) => {
                    event.preventDefault();
                    handleCreateButtonClick();
                }}
            >
                <Stack spacing={2}>
                    <Typography variant="h5">
                        <Box sx={{ textAlign: 'center' }}>
                            Let's create a new league!
                        </Box>
                    </Typography>
                    <TextField
                        variant="filled"
                        value={leagueName || ''}
                        onChange={({ target: { value } }) =>
                            setLeagueName(value)
                        }
                        error={leagueName === ''}
                        label="League name"
                        helperText="Required"
                        disabled={isLoading}
                        required
                    />
                    <Divider />
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    disabled={isLoading}
                                    checked={includeFavoritesTeam}
                                    onChange={(e) =>
                                        setIncludeFavoritesTeam(
                                            e.target.checked,
                                        )
                                    }
                                />
                            }
                            label="Add a team that only picks favorites"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    disabled={isLoading}
                                    checked={includeRandomTeam}
                                    onChange={(e) =>
                                        setIncludeRandomTeam(e.target.checked)
                                    }
                                />
                            }
                            label="Add a team picks randomly"
                        />
                    </FormGroup>
                    <Divider />
                    <Box>
                        <InputLabel>Max number of teams</InputLabel>
                        <Slider
                            disabled={isLoading}
                            id="max-teams"
                            valueLabelDisplay="auto"
                            marks={maxTeamsPossibleValues.map((n) => ({
                                value: n,
                                label: n,
                            }))}
                            step={1}
                            min={1}
                            max={10}
                            defaultValue={4}
                            value={maxTeams}
                            onChange={(_, value) =>
                                setMaxTeams(value as number)
                            }
                        />
                    </Box>
                    <Divider />
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    disabled={isLoading}
                                    checked={isAts}
                                    onChange={(e) => setIsAts(e.target.checked)}
                                />
                            }
                            label="Pick ATS"
                        />
                    </FormGroup>
                    {isAts && getOddsProvidersCallback.result && (
                        <Autocomplete
                            value={selectedOddsProvider}
                            onChange={(_, v) =>
                                setOddsProviderId(v?.id ?? null)
                            }
                            options={getOddsProvidersCallback.result.oddsProviders.map(
                                (p) => ({
                                    label: p.name,
                                    id: p.id,
                                }),
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="Odds provider" />
                            )}
                            getOptionLabel={(option) => option.label ?? ''}
                        />
                    )}
                    <Divider />
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    disabled={isLoading}
                                    checked={includePreseason}
                                    onChange={(e) =>
                                        setIncludePreseason(e.target.checked)
                                    }
                                />
                            }
                            label="Include preseason games"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    disabled={isLoading}
                                    checked={includePostseason}
                                    onChange={(e) =>
                                        setIncludePostseason(e.target.checked)
                                    }
                                />
                            }
                            label="Include postseason games"
                        />
                    </FormGroup>
                    <Divider />
                    <Button
                        type="submit"
                        loading={isLoading}
                        variant="contained"
                        disabled={!leagueName || (isAts && !oddsProviderId)}
                    >
                        Create
                    </Button>
                    {createLeagueCallback.error && (
                        <Alert severity="error">
                            We were unable to create a league!
                        </Alert>
                    )}
                </Stack>
            </Container>
        </Container>
    );
};
