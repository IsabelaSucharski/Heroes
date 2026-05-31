import React from 'react';
import { Box, TextField } from '@mui/material';
import { z } from 'zod';

const heroSchema = z.object({
  name: z.string().min(3, 'Nome completo obrigatório'),
  nickname: z.string().min(2, 'Nome de guerra obrigatório'),
  date_of_birth: z.string().min(1, 'Data de nascimento obrigatória'),
  universe: z.string().min(1, 'Universo obrigatório'),
  main_power: z.string().min(1, 'Habilidade obrigatória'),
  avatar_url: z.string().min(1, 'URL de avatar obrigatória'),
});

export type CreateHeroFormData = z.infer<typeof heroSchema>;

type CreateHeroProps = {
  onSubmit: (data: CreateHeroFormData) => void;
};

export const CreateHero = ({ onSubmit }: CreateHeroProps) => {
  const [errors, setErrors] = React.useState<Partial<Record<keyof CreateHeroFormData, string>>>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = {
      name: formData.get('name')?.toString().trim() ?? '',
      nickname: formData.get('nickname')?.toString().trim() ?? '',
      date_of_birth: formData.get('date_of_birth')?.toString().trim() ?? '',
      universe: formData.get('universe')?.toString().trim() ?? '',
      main_power: formData.get('main_power')?.toString().trim() ?? '',
      avatar_url: formData.get('avatar_url')?.toString().trim() ?? '',
    };

    const parsed = heroSchema.safeParse(formValues);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof CreateHeroFormData, string>> = {};
      parsed.error.issues.forEach((error) => {
        const path = error.path[0] as keyof CreateHeroFormData;
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    event.currentTarget.reset();
    onSubmit(parsed.data);
  };

  return (
    <Box component="form" id="subscription-form" onSubmit={handleSubmit} noValidate>
      <TextField
        autoFocus
        required
        margin="dense"
        id="name"
        name="name"
        label="Nome completo"
        type="text"
        fullWidth
        variant="outlined"
        error={Boolean(errors.name)}
        helperText={errors.name}
      />
      <TextField
        required
        margin="dense"
        id="nickname"
        name="nickname"
        label="Nome de guerra"
        type="text"
        fullWidth
        variant="outlined"
        error={Boolean(errors.nickname)}
        helperText={errors.nickname}
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          required
          margin="dense"
          id="date_of_birth"
          name="date_of_birth"
          label="Data de nascimento"
          type="date"
          fullWidth
          variant="outlined"
          error={Boolean(errors.date_of_birth)}
          helperText={errors.date_of_birth}
        />
        <TextField
          required
          margin="dense"
          id="universe"
          name="universe"
          label="Universo"
          type="text"
          fullWidth
          variant="outlined"
          error={Boolean(errors.universe)}
          helperText={errors.universe}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField
          required
          margin="dense"
          id="main_power"
          name="main_power"
          label="Habilidade"
          type="text"
          fullWidth
          variant="outlined"
          error={Boolean(errors.main_power)}
          helperText={errors.main_power}
        />
        <TextField
          required
          margin="dense"
          id="avatar_url"
          name="avatar_url"
          label="URL do Avatar"
          type="text"
          fullWidth
          variant="outlined"
          error={Boolean(errors.avatar_url)}
          helperText={errors.avatar_url}
        />
      </Box>
    </Box>
  );
};
