import { Box, TextField } from "@mui/material"

export const CreateHero = () => {
    return (
        <Box>
            <form id="subscription-form">
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
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="nickName"
                    name="nickName"
                    label="Nome de guerra"
                    type="text"
                    fullWidth
                    variant="outlined"
                />

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }} >
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="date_of_birth"
                        name="date_of_birth"
                        label="Data de nascimento"
                        type="date"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="universe"
                        name="universe"
                        label="Universe"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />

                </Box>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }} >
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="main_power"
                        name="main_power"
                        label="Habilidade"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="avatar"
                        name="avatar"
                        label="Avatar"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                </Box>

            </form>
        </Box>
    )
}