import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useIsMobileUi } from '../hooks/useIsMobileUi';
import { getAvatarInitials } from './getAvatarInitials';

export interface AvatarWithNameProps {
    firstName: string;
    lastName: string;
    imageUrl?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const AvatarWithName: React.FC<AvatarWithNameProps> = ({
    firstName,
    lastName,
    imageUrl,
    onClick,
}) => {
    const { isMobileUi } = useIsMobileUi();
    const name = `${firstName} ${lastName}`;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobileUi && (
                <Typography sx={{ marginRight: '1rem' }}>{name}</Typography>
            )}
            <Tooltip title="Account settings">
                <IconButton onClick={onClick}>
                    <Avatar alt={name} src={imageUrl}>
                        {getAvatarInitials(firstName, lastName)}
                    </Avatar>
                </IconButton>
            </Tooltip>
        </Box>
    );
};
