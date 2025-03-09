import Container from '@mui/material/Container';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import { toCanvas } from 'qrcode';

export interface LeagueLinkProps {
    leagueId: string;
    leagueUrl: string;
}

export const LeagueLink: React.FC<LeagueLinkProps> = ({
    leagueId,
    leagueUrl,
}) => {
    const [copied, setCopied] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!(canvasRef.current && leagueUrl)) {
            return;
        }
        toCanvas(canvasRef.current, leagueUrl, { width: 280 });
    }, [canvasRef, leagueUrl]);

    const handleCopyToClipboard = () => {
        if (!leagueUrl) {
            return;
        }
        navigator.clipboard.writeText(leagueUrl);
        setCopied(true);
    };
    return (
        <Container sx={{ padding: '3rem' }} component={Paper}>
            <Container component="form" maxWidth="sm">
                <Stack spacing={2} textAlign="center">
                    <Typography variant="h5">League created!</Typography>
                    <Link
                        to="/league/$leagueId"
                        params={{
                            leagueId,
                        }}
                    >
                        Go there now
                    </Link>
                    <Typography component="div">
                        This link will allow new members to join your team!
                    </Typography>
                    <FilledInput
                        hiddenLabel
                        defaultValue={leagueUrl}
                        title={leagueUrl}
                        endAdornment={
                            <InputAdornment position="end">
                                <Tooltip
                                    title={
                                        copied
                                            ? 'Copied!'
                                            : 'Copy link to clipboard'
                                    }
                                >
                                    <IconButton onClick={handleCopyToClipboard}>
                                        {copied ? (
                                            <CheckIcon />
                                        ) : (
                                            <ContentCopyIcon />
                                        )}
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        }
                    />
                    <Box sx={{ textAlign: 'center' }}>
                        <canvas width={280} height={280} ref={canvasRef} />
                    </Box>
                </Stack>
            </Container>
        </Container>
    );
};
