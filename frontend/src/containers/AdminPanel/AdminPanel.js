import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteCocktail, fetchCocktails, onActivate} from "../../store/actions/cocktailActions";
import {Grid, Typography} from "@mui/material";
import Panel from "../../components/Panel/Panel";
import {historyPush} from "../../store/actions/historyActions";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const cocktails = useSelector(state => state.cocktails.cocktails);
  const user = useSelector(state => state.users.user);


  if((user && user.role !== 'admin') || !user) {
    dispatch(historyPush('/login'));
  }

  useEffect(() => {
    dispatch(fetchCocktails(user, ''));
  },[]);

  const handleChange = (status, id) => {
    const data = {published: status}
    dispatch(onActivate(data, id, user));
  }

  const deleteHandler = (id) => {
    dispatch(deleteCocktail(id, user));
  }


  return (
    <Grid container direction='column' sx={{maxWidth: '70%', margin: '30px'}}>
      {cocktails &&
        <Grid item sx={{margin: '25px 0'}}>
          <Typography variant='h6'>Pending to approve</Typography>
          <Panel
            data={cocktails}
            title='Cocktails'
            name='cocktails'
            handleChange={handleChange}
            deleteHandler={deleteHandler}
          />
        </Grid>}
    </Grid>

  );
};

export default AdminPanel;