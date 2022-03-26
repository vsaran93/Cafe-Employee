import React from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';

const MainLayout = ({children}) => {
    return (
        <>
            <Header />
            <Container maxWidth="false">
                <main>
                    {children}
                </main>
            </Container>
        </>
    );
};

export default MainLayout;
