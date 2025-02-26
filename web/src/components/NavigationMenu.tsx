import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

export const NavigationMenu: React.FC = () => {
    return (
        <Drawer variant="permanent" anchor="left">
            <List>
                <ListItemButton>hi</ListItemButton>
            </List>
        </Drawer>
    );
};
