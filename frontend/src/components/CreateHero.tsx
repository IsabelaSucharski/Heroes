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
  values?: Partial<CreateHeroFormData>;
};

const initialFormValues: CreateHeroFormData = {
  name: '',
  nickname: '',
  date_of_birth: '',
  universe: '',
  main_power: '',
  avatar_url: '',
};

export const CreateHero = ({ onSubmit, values }: CreateHeroProps) => {
  const [formValues, setFormValues] = React.useState<CreateHeroFormData>(values ? { ...initialFormValues, ...values } : initialFormValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof CreateHeroFormData, string>>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    if (!values) {
      setFormValues(initialFormValues);
    }
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
        value={formValues.name}
        onChange={handleChange}
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
        value={formValues.nickname}
        onChange={handleChange}
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
          value={formValues.date_of_birth}
          onChange={handleChange}
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
          value={formValues.universe}
          onChange={handleChange}
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
          value={formValues.main_power}
          onChange={handleChange}
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
          value={formValues.avatar_url}
          onChange={handleChange}
          error={Boolean(errors.avatar_url)}
          helperText={errors.avatar_url}
        />
      </Box>
    </Box>
  );
};
