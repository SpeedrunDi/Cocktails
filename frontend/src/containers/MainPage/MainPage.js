import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress, Grid, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import {fetchCocktails} from "../../store/actions/cocktailActions";
import CocktailsLayout from "../../components/CocktailsLayout/CocktailsLayout";
import CocktailItem from "../../components/CocktailItem/CocktailItem";

const useStyles = makeStyles()(theme => ({
    title: {
        [theme.breakpoints.down('xs')]: {
            marginLeft: "50px",
        },
    }
}));

const MainPage = ({history}) => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const fetchLoading = useSelector(state => state.cocktails.fetchLoading);
    const cocktails = useSelector(state => state.cocktails.cocktails);

    useEffect(() => {
        dispatch(fetchCocktails(user, '?publish=true'));
    }, [dispatch, user]);

    useEffect(() => {
       if (!user) {
           history.push("/login");
       }
    }, [user, history]);

    return (

        <CocktailsLayout>
            <Grid container direction="column" spacing={2}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item className={classes.title}>
                        <Typography variant="h4">Cocktails</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid item container justifyContent="center" direction="row" spacing={1}>
                        {fetchLoading ? (
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item>
                                    <CircularProgress/>
                                </Grid>
                            </Grid>
                        ) : cocktails.map(cocktail => (
                            <CocktailItem
                                key={cocktail._id}
                                id={cocktail._id}
                                name={cocktail.title}
                                recipe={cocktail.recipe}
                                image={cocktail.image}
                                published={cocktail.published}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </CocktailsLayout>

    );
};

export default MainPage;