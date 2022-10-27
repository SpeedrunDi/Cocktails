import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCocktails} from "../../store/actions/cocktailActions";
import {Grid, Typography} from "@mui/material";
import Panel from "../../components/Panel/Panel";

const AdminPanel = () => {
  // const dispatch = useDispatch();
  // const cocktails = useSelector(state => state.cocktails.cocktails);


  // useEffect(() => {
    // dispatch(fetchCocktails());
  // },[]);

  // const handleChange = (id) => {
  //   console.log(id);
  // }

  // const deleteHandler = (event, name, value) => {
    // switch (name) {
    //   case 'artists':
    //     return dispatch(deleteArtist(value, user));
    //
    //   case 'albums':
    //     return dispatch(deleteAlbum(value, user));
    //
    //   case 'tracks':
    //     return dispatch(deleteTrack(value, user));
    //
    //   default:
    //     break
    // }
  // }


  return (
    <Grid container direction='column' sx={{maxWidth: '70%', margin: '30px'}}>
      {/*{cocktails &&*/}
      {/*  <Grid item sx={{margin: '25px 0'}}>*/}
      {/*    <Typography variant='h6'>Pending to approve</Typography>*/}
      {/*    <Panel*/}
      {/*      data={cocktails}*/}
      {/*      title='Cocktails'*/}
      {/*      name='cocktails'*/}
      {/*      handleChange={handleChange}*/}
      {/*      deleteHandler={deleteHandler}*/}
      {/*    />*/}
      {/*  </Grid>}*/}
    </Grid>

  );
};

export default AdminPanel;