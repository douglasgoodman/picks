import Brightness4 from '@mui/icons-material/Brightness4';
import Brightness7 from '@mui/icons-material/Brightness7';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { PaletteMode } from '@mui/material';
import { useAuthContext } from '../context/AuthContext';
import { AvatarWithName } from './AvatarWithName';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import footballImage from '../images/football.png';
import thumbsUpImage from '../images/thumbsup.png';
import cameraImage from '../images/camera.png';
import { useIsMobileUi } from '../hooks/useIsMobileUi';
import Stack from '@mui/material/Stack';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export interface HeaderProps {
    paletteMode: PaletteMode;
    togglePaletteMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    paletteMode,
    togglePaletteMode,
}) => {
    const { isMobileUi } = useIsMobileUi();
    const { user, signOut, inProgress } = useAuthContext();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const imageSx = { height: '24px', width: '24px' };

    const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAvatarMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMyAccountClick = () => {
        setAnchorEl(null);
    };

    const handleSignOutClick = () => {
        setAnchorEl(null);
        signOut();
    };

    return (
        <AppBar position="relative">
            <Toolbar sx={{ padding: '0' }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    component={Link}
                    to="/"
                >
                    <Box
                        component="img"
                        src={thumbsUpImage}
                        sx={{ ...imageSx, transform: 'scaleX(-1)' }}
                    />
                    <Box component="img" src={footballImage} sx={imageSx} />
                    <Box component="img" src={footballImage} sx={imageSx} />
                    <Box component="img" src={thumbsUpImage} sx={imageSx} />
                    <Box component="img" src={cameraImage} sx={imageSx} />
                </Stack>
                <Box sx={{ flexGrow: 1, marginLeft: '1rem' }}>
                    {!isMobileUi && (
                        <Typography variant="h4">
                            Show me your Picks!!
                        </Typography>
                    )}
                </Box>
                {!!user && (
                    <>
                        <AvatarWithName
                            firstName={user.firstName}
                            lastName={user.lastName}
                            imageUrl={user.userImageUrl}
                            onClick={handleAvatarClick}
                        />
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleAvatarMenuClose}
                        >
                            <MenuItem onClick={handleMyAccountClick}>
                                My account
                            </MenuItem>
                            {isMobileUi && (
                                <MenuItem
                                    onClick={togglePaletteMode}
                                >{`Toggle ${
                                    paletteMode === 'dark' ? 'light' : 'dark'
                                } mode`}</MenuItem>
                            )}
                            <MenuItem onClick={handleSignOutClick}>
                                Sign out
                            </MenuItem>
                        </Menu>
                    </>
                )}
                {!inProgress && !user && (
                    <Button color="inherit" component={Link} to="/signin">
                        Sign in
                    </Button>
                )}
                {!isMobileUi && (
                    <Tooltip
                        title={`Toggle ${
                            paletteMode === 'dark' ? 'light' : 'dark'
                        } mode`}
                    >
                        <IconButton size="large" onClick={togglePaletteMode}>
                            {paletteMode === 'dark' ? (
                                <Brightness7 />
                            ) : (
                                <Brightness4 />
                            )}
                        </IconButton>
                    </Tooltip>
                )}
            </Toolbar>
        </AppBar>
    );
};
