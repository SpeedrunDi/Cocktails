import React, {useEffect, useState} from 'react';
import {FormControl, Grid, InputLabel, LinearProgress, Select, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {apiUrl} from "../../config";
import noImage from "../../assets/images/noImage.png";

const STATICESTIMATES = [1, 2, 3, 4, 5];

const FullCocktail = ({cocktail, onRate, user, loading}) => {
  const [rating, setRating] = useState(0);
  let image = noImage;

  useEffect(() => {
    if (cocktail.rates.length !== 0) {
      cocktail.rates.forEach(rate => {
        if (user._id === rate.user) {
          setRating(rate.rate);
        }
      });
    }
  }, [cocktail, user]);

  if (cocktail.image && cocktail.image.includes('fixtures')) {
    image = apiUrl + '/' + cocktail.image;
  } else if (cocktail.image) {
    image = cocktail.image
  }

  return (
    <Grid container padding="20px">
      <Grid item xs={4} padding="20px">
        <img src={image} style={{width: "100%", height: "auto"}} alt={cocktail.title}/>
      </Grid>
      <Grid item xs={6} padding="20px">
        <Typography variant="h5">
          {cocktail.title}
        </Typography>
        {
          cocktail.rating &&
          <Typography>
            <b>Rating: </b>
            {cocktail.rating} ({cocktail.rates.length} votes)
          </Typography>
        }
        {
          cocktail.ingredients && (
            <>
              <Typography><b>Ingredients:</b></Typography>
              {cocktail.ingredients.map(ingredient => (
                <Typography key={ingredient._id}>
                &nbsp;&nbsp;&bull;&nbsp;&nbsp;
                <Typography variant="span">{ingredient.name} - </Typography>
                <Typography variant="span">{ingredient.amount}</Typography>
                </Typography>
              ))}
            </>
          )
        }
      </Grid>
      <Grid item xs={12} padding="20px">
        <Typography>
          <b>Recipe: </b>
          {cocktail.recipe}
        </Typography>
      </Grid>
      <Grid item xs={12} padding="20px">
        <FormControl fullWidth>
          <InputLabel id={`rate-label`}>Rate</InputLabel>
          <Select
            labelId={`rate-label`}
            fullWidth
            label="Rate"
            value={rating}
            onChange={e => [onRate(e.target.value), setRating(e.target.value)]}
          >
            <MenuItem key={'rate'} value="0" disabled>
              Rate the cocktail &#9734;
            </MenuItem>
            {STATICESTIMATES.map(option => (
              <MenuItem key={option + 'rate'} value={option}>
                {option} &#9734;
              </MenuItem>
            ))}
          </Select>
          {loading && <LinearProgress/>}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FullCocktail;