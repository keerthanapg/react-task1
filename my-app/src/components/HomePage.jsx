import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" className="home-container">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
                <Typography variant="h2" align="center" gutterBottom>
                    Welcome to the Dashboard
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => navigate('/users')}
                    sx={{ mb: 2, width: '100%', maxWidth: '300px' }}
                >
                    View Users
                </Button>
                <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => navigate('/products')}
                    sx={{ width: '100%', maxWidth: '300px' }}
                >
                    View Products
                </Button>
            </Box>
        </Container>
    );
};

export default HomePage;
