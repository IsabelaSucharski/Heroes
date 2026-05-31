import { Delete, Edit } from "@mui/icons-material"
import { MenuItem, Menu, Switch } from "@mui/material"

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
            <MenuItem onClick={onEdit}><Edit /></MenuItem>
            <MenuItem onClick={onDelete}><Delete /></MenuItem>
            <MenuItem onClick={onActivate}><Switch onChange={onActivate} value={heroActive} /></MenuItem>
        </Menu>
    )
}