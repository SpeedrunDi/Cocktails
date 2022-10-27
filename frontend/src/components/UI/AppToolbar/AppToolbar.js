import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {makeStyles} from "tss-react/mui";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {AppBar, CardMedia, Grid, Toolbar, Typography} from "@mui/material";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";
import imageNotAvailable from "../../../assets/notavailable.jpeg";

import {apiUrl} from "../../../config";

const useStyles = makeStyles()(theme => ({
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        },
    },
    staticToolbar: {
        marginBottom: theme.spacing(2)
    },
}));

const AppToolbar = () => {
    const {classes} = useStyles();
    const user = useSelector(state => state.users.user);

    let cardImage = imageNotAvailable;

    if (user && user.avatar.includes('fixtures')) {
        cardImage = apiUrl + '/' + user.avatar;
    } else if (user) {
        cardImage = user.avatar
    }


    return (
        <>
            <AppBar position="fixed">
                <ToastContainer/>

                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h6">
                                <Link to="/" className={classes.mainLink}>
                                    Cocktails
                                </Link>
                            </Typography>
                        </Grid>

                        <Grid item>
                            {user ?
                                (<div className='user' style={{display: "flex"}}>
                                    <CardMedia
                                        component="img"
                                        height="50"
                                        image={cardImage}
                                        alt={user.name}
                                        style={{margin: 'auto 0'}}
                                    />
                                    <UserMenu user={user}/>
                                </div>) : <Anonymous/>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};

export default AppToolbar;