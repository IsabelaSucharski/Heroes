import { Button, Typography } from '@mui/material';
import { Modal } from '../components/Modal';
import React from 'react';
import { CreateHero } from '../components/CreateHero';


export const HeroesList = () => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenCloseModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <Typography variant="h3" gutterBottom >
                Heroes App
            </Typography>

            < Button variant="contained" onClick={handleOpenCloseModal} >
                Cadastrar Herói
            </Button>

            <Modal open={isModalOpen} onClose={handleOpenCloseModal} title="Cadastrar Herói" actions={
                <>
                    <Button onClick={handleOpenCloseModal}>Cancel</Button>
                    <Button type="submit" form="subscription-form">
                        Subscribe
                    </Button>
                </>
            }>
                <CreateHero />
            </Modal>
        </>
    );

}