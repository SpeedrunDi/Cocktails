import React, {useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import Panel from "../../components/Panel/Panel";
import {useDispatch, useSelector} from "react-redux";
import {fetchCocktails} from "../../store/actions/cocktailActions";

const UserPanel = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector(state => state.cocktails.cocktails);
  const user = useSelector(state => state.users.user);


  useEffect(() => {
    dispatch(fetchCocktails(user,'/my_cocktails'));
  },[]);


  return (
    <Grid container direction='column' sx={{maxWidth: '70%', margin: '30px'}}>
      {cocktails &&
        <Grid item sx={{margin: '25px 0'}}>
          <Typography variant='h6'>My cocktails</Typography>
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