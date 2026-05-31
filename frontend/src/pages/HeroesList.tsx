import { Alert, Box, Button, IconButton, InputAdornment, Pagination, Snackbar, TextField, Typography } from '@mui/material';
import { Modal } from '../components/Modal';
import React from 'react';
import { CreateHero } from '../components/CreateHero';
import { useHeroes, useDeleteHero, useUpdateHero } from '../hooks/useHeroes';
import { HeroCard } from '../components/HeroCard';
import { createHero } from '../services/api';
import ClearIcon from '@mui/icons-material/Clear';
import type { Hero } from '../types/hero';
import { Search } from '@mui/icons-material';
import Loading from '../components/Loading';

export const HeroesList = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editingHero, setEditingHero] = React.useState<Hero | null>(null);
  const [page, setPage] = React.useState(1);
  const [queryInput, setQueryInput] = React.useState('');
  const deferredQuery = React.useDeferredValue(queryInput);
  const [queryForSearch, setQueryForSearch] = React.useState<string | undefined>(undefined);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleOpenCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSearch = () => {
    const queryForSearch = deferredQuery && deferredQuery.length >= 1 ? deferredQuery : undefined;
    setQueryForSearch(queryForSearch);
  };

  const resetSearch = () => {
    setQueryInput('');
    setQueryForSearch(undefined);
  };


  const { heroes, page: currentPage, totalPages, isLoading, error, refresh } = useHeroes({ search: queryForSearch, page, limit: 10 });
  const { deleteHero: deleteHeroMutation, isDeleting, deleteError } = useDeleteHero();
  const { updateHero: updateHeroMutation, isUpdating, updateError } = useUpdateHero();

  const handleCreateHero = async (heroPayload: {
    name: string;
    nickname: string;
    date_of_birth: string;
    universe: string;
    main_power: string;
    avatar_url: string;
  }) => {
    try {
      await createHero(heroPayload);
      refresh();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao cadastrar herói', error);
    }
  };

  const handleEditHero = (hero: Hero) => {
    setEditingHero(hero);
    setIsEditModalOpen(true);
  };

  const handleUpdateHero = async (heroPayload: {
    name: string;
    nickname: string;
    date_of_birth: string;
    universe: string;
    main_power: string;
    avatar_url: string;
  }) => {
    try {
      if (editingHero) {
        await updateHeroMutation({ heroId: editingHero.id, payload: heroPayload });
        refresh();
        setIsEditModalOpen(false);
        setEditingHero(null);
      }
    } catch (error) {
      setOpenSnackbar(true);
      throw error;
    }
  };

  const handleActivateHero = async (heroId: string, isActive: boolean) => {
    try {
      await updateHeroMutation({ heroId, payload: { is_active: isActive } });
      refresh();
    } catch (error) {
      setOpenSnackbar(true);
      throw error;
    }
  };

  const handleDeleteHero = async (heroId: string) => {
    try {
      await deleteHeroMutation(heroId);
      refresh();
    } catch (error) {
      setOpenSnackbar(true);
      throw error;
    }
  };

  if (isLoading || isDeleting || isUpdating) {
    return <Loading />;
  }



  return (
    <>
      <Typography variant="h3" gutterBottom>
        Heroes Factory
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', width: '100%' }}>
        <Button variant="contained" onClick={handleOpenCloseModal}>
          Cadastrar Herói
        </Button>
        <TextField
          label="Buscar por nome ou apelido"
          value={queryInput}
          onChange={(event) => setQueryInput(event.target.value)}
          size="small"
          sx={{ flexGrow: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: queryInput ? (
                <InputAdornment position="end">
                  <IconButton onClick={resetSearch} size="small" aria-label="clear search">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
        />
        <Button variant="contained" onClick={() => handleSearch()} disabled={deferredQuery.length < 1}>
          Buscar
        </Button>
      </Box>

      <Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', flexWrap: 'wrap', gap: 2 }}>

          {heroes.map((hero: Hero) => (
            <HeroCard
              key={hero.id}
              hero={hero}
              onEdit={handleEditHero}
              onDelete={handleDeleteHero}
              onDeleteSuccess={() => refresh()}
              onActivate={handleActivateHero}
            />
          ))}

          {!heroes.length && <Typography variant="h6">Nenhum herói encontrado.</Typography>}

        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={totalPages && totalPages} color="primary" onChange={(_, page) => setPage(page)} page={currentPage} />
        </Box>

      </Box>

      <Modal
        open={isModalOpen}
        onClose={handleOpenCloseModal}
        title="Cadastrar Herói"
        actions={
          <>
            <Button onClick={handleOpenCloseModal}>Cancelar</Button>
            <Button type="submit" form="subscription-form">
              Cadastrar
            </Button>
          </>
        }
      >
        <CreateHero onSubmit={handleCreateHero} />
      </Modal>

      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Herói"
        actions={
          <>
            <Button onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
            <Button type="submit" form="subscription-form">
              Atualizar
            </Button>
          </>
        }
      >
        {editingHero && (
          <CreateHero
            key={editingHero.id}
            onSubmit={handleUpdateHero}
            values={editingHero}
          />
        )}
      </Modal>


      {
        error &&
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} >
          <Alert severity="error">Erro ao carregar heróis. Tente novamente.</Alert>
        </Snackbar>
      }

      {deleteError &&
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} >
          <Alert severity="error">Erro ao deletar herói. Tente novamente.</Alert>
        </Snackbar>
      }

      {updateError &&
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} >
          <Alert severity="error">Erro ao atualizar herói. Tente novamente.</Alert>
        </Snackbar>
      }

    </>
  );
};
