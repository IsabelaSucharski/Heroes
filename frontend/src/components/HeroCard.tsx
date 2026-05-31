import { CardContent, Typography, Card, Avatar, Box, IconButton, Button } from '@mui/material';
import type { Hero } from '../types/hero';
import { MoreVert } from '@mui/icons-material';
import React from 'react';
import { Actions } from './Actions';
import { Modal } from './Modal';

type HeroCardProps = {
    hero: Hero;
    onEdit?: (hero: Hero) => void;
    onDelete?: (heroId: string) => Promise<void> | void;
    onDeleteSuccess?: () => void;
    onActivate?: (heroId: string, isActive: boolean) => Promise<void> | void;
};

export const HeroCard = ({ hero, onEdit, onDelete, onDeleteSuccess, onActivate }: HeroCardProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openActivateModal, setOpenActivateModal] = React.useState(false);
    const isActive = hero.is_active;

    const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleCloseMenu();
        if (!isActive) return;
        onEdit?.(hero);
    };

    const handleDelete = () => {
        handleCloseMenu();
        setOpenDeleteModal(true);
    };

    const handleActivate = () => {
        handleCloseMenu();
        setOpenActivateModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await onDelete?.(hero.id);
            onDeleteSuccess?.();
            setOpenDeleteModal(false);
        } catch (error) {
            console.error('Erro ao deletar herói:', error);
            window.alert('Erro ao deletar herói. Tente novamente.');
        }
    };

    const handleConfirmActivate = async () => {
        try {
            await onActivate?.(hero.id, !hero.is_active);
            setOpenActivateModal(false);
        } catch (error) {
            console.error('Erro ao ativar herói:', error);
            window.alert('Erro ao ativar herói. Tente novamente.');
        }
    };


    return (
        <>
            <Card
                style={{
                    marginBottom: '16px',
                    backgroundColor: isActive ? undefined : '#f5f5f5',
                    color: isActive ? undefined : '#777',
                }}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ float: 'right', width: '100%' }}>
                            <IconButton aria-label="options" size="small" style={{ float: 'right', position: 'relative' }} onClick={handleOpenMenu}>
                                <MoreVert fontSize="small" />
                            </IconButton>
                        </Box>
                        <Avatar alt={hero.name} src={hero.avatar_url} style={{ width: 100, height: 100, marginBottom: '16px' }} />
                        <Typography variant="h5" component="div" sx={{ color: isActive ? undefined : 'text.disabled' }}>
                            {hero.name}
                        </Typography>
                        {!isActive && (
                            <Typography variant="body2" color="text.secondary">
                                Inativo
                            </Typography>
                        )}
                    </Box>

                </CardContent>
            </Card>

            <Actions
                open={openMenu}
                anchorEl={anchorEl}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClose={handleCloseMenu}
                onActivate={handleActivate}
                heroActive={hero.is_active}
            />

            <Modal
                title={`Deseja deletar o herói ${hero.name}?`}
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                actions={<>
                    <Button onClick={() => setOpenDeleteModal(false)}>Cancelar</Button>
                    <Button color="error" onClick={handleConfirmDelete}>Deletar</Button>
                </>}
            ></Modal>

            <Modal
                title={`Deseja ${hero.is_active ? 'desativar' : 'ativar'} o herói ${hero.name}?`}
                open={openActivateModal}
                onClose={() => setOpenActivateModal(false)}
                actions={<>
                    <Button onClick={() => setOpenActivateModal(false)}>Cancelar</Button>
                    <Button onClick={handleConfirmActivate}> {hero.is_active ? 'Desativar' : 'Ativar'} </Button>
                </>}
            ></Modal>
        </>
    );
}
