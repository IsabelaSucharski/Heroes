import { Box, Button, Typography } from '@mui/material';
import { Modal } from '../components/Modal';
import React from 'react';
import { CreateHero } from '../components/CreateHero';
import { useHeroes } from '../hooks/useHeroes';
import { HeroCard } from '../components/HeroCard';
import { createHero } from '../services/api';
import type { Hero } from '../types/hero';

export const HeroesList = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const { heroes, isLoading, error, refresh } = useHeroes();

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
      window.alert('Não foi possível cadastrar o herói. Tente novamente.');
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar heróis. Verifique o backend e atualize a página.</div>;
  }

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Heroes Factory
      </Typography>

      <Button variant="contained" onClick={handleOpenCloseModal}>
        Cadastrar Herói
      </Button>

      <Box>
        {heroes.map((hero: Hero) => (
          <HeroCard key={hero.id} hero={hero} />
        ))}
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
