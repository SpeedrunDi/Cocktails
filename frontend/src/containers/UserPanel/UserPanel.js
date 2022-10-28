import React, {useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import Panel from "../../components/Panel/Panel";
import {useDispatch, useSelector} from "react-redux";
import {fetchCocktails} from "../../store/actions/cocktailActions";
import {historyPush} from "../../store/actions/historyActions";

const UserPanel = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector(state => state.cocktails.cocktails);
  const user = useSelector(state => state.users.user);


  useEffect(() => {
    dispatch(fetchCocktails(user,'/my_cocktails'));
  },[dispatch, user]);

  useEffect(() => {
    if((user && user.role !== 'user') || !user) {
      dispatch(historyPush('/login'));
    }
  }, [user, dispatch]);


  return (
    <Grid container direction='column' sx={{maxWidth: '70%', margin: '30px'}}>
      {cocktails &&
        <Grid item sx={{margin: '25px 0'}}>
          <Typography variant='h4' textAlign={"center"} mb={"20px"}>My cocktails</Typography>
          <Panel
            data={cocktails}
            title='Cocktails'
            name='cocktails'
          />
        </Grid>}
    </Grid>
  );
};

export default UserPanel;