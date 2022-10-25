import React from 'react';
import {Router} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {ThemeProvider} from "@mui/material";
import thunk from 'redux-thunk';
import App from './App';
import history from './history';
import theme from './theme';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router history={history}>
                <App/>
            </Router>
        </ThemeProvider>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);