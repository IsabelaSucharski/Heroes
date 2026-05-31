import { Box, Button, IconButton, InputAdornment, Pagination, TextField, Typography } from '@mui/material';
import { Modal } from '../components/Modal';
import React from 'react';
import { CreateHero } from '../components/CreateHero';
import { useHeroes } from '../hooks/useHeroes';
import { HeroCard } from '../components/HeroCard';
import { createHero } from '../services/api';
import ClearIcon from '@mui/icons-material/Clear';
import type { Hero } from '../types/hero';
import { Search } from '@mui/icons-material';
import Loading from '../components/Loading';

export const HeroesList = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [queryInput, setQueryInput] = React.useState('');
  const deferredQuery = React.useDeferredValue(queryInput);
  const [queryForSearch, setQueryForSearch] = React.useState<string | undefined>(undefined);

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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro ao carregar heróis. Verifique o backend e atualize a página.</div>;
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
            <HeroCard key={hero.id} hero={hero} />
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
    </>
  );
};
