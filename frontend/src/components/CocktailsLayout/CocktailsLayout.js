import React from 'react';
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(() => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1
    },
}));

const CocktailsLayout = ({children}) => {
    const {classes} = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    );
};

export default CocktailsLayout;