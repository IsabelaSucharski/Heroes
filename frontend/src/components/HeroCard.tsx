import { CardContent, Typography, Card, Avatar, Box, IconButton } from '@mui/material';
import type { Hero } from '../types/hero';
import { Info } from '@mui/icons-material';


export const HeroCard = ({ hero }: { hero: Hero }) => {
    return (
        <Card style={{ marginBottom: '16px' }}>
            <CardContent>
                <Box>
                    <IconButton aria-label="delete" size="small" style={{ float: 'right' }}>
                        <Info fontSize="small" />
                    </IconButton>
                </Box>
                <Avatar alt={hero.name} src={hero.avatar_url} style={{ width: 100, height: 100, marginBottom: '16px' }} />
                <Typography variant="h5" component="div">
                    {hero.name}
                </Typography>

            </CardContent>
        </Card>
    );
}   