import React from 'react';
import AppToolbar from "../AppToolbar/AppToolbar";
import {Container, CssBaseline} from "@mui/material";
import './Layout.css';

const Layout = ({children}) => {
    return (
        <>
            <CssBaseline/>
            <AppToolbar/>
            <main>
                <Container maxWidth="xl">
                    {children}
                </Container>
            </main>
        </>
    );
};

export default Layout;