import { Delete, Edit } from "@mui/icons-material"
import { MenuItem, Menu } from "@mui/material"

interface ActionsProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    onEdit: () => void;
    onDelete: () => void;
    onClose: () => void;
}

export const Actions = ({ onEdit, onDelete, onClose, open, anchorEl }: ActionsProps) => {

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
        </Menu>
)}