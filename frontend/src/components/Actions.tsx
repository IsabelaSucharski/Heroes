import { Delete, Edit } from "@mui/icons-material";
import { MenuItem, Menu, ListItemIcon, ListItemText, Switch } from "@mui/material";

interface ActionsProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    onEdit: () => void;
    onDelete: () => void;
    onClose: () => void;
    onActivate: () => void;
    heroActive: boolean;
}

export const Actions = ({ onEdit, onDelete, onClose, onActivate, open, anchorEl, heroActive }: ActionsProps) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <MenuItem onClick={onEdit} disabled={!heroActive}>
                <ListItemIcon>
                    <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText>Editar</ListItemText>
            </MenuItem>

            <MenuItem onClick={onDelete} disabled={!heroActive}>
                <ListItemIcon>
                    <Delete fontSize="small" />
                </ListItemIcon>
                <ListItemText>Excluir</ListItemText>
            </MenuItem>
            <MenuItem onClick={onActivate}>
                <Switch checked={heroActive} onChange={onActivate} color="primary" />
            </MenuItem>
        </Menu>
    );
};