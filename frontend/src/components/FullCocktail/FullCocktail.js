import React, {useEffect, useState} from 'react';
import {Box, Grid, LinearProgress, Typography} from "@mui/material";
import StarsRating from "react-star-rate";
import {apiUrl} from "../../config";
import noImage from "../../assets/images/noImage.png";

const FullCocktail = ({cocktail, onRate, user, loading}) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (cocktail.rates.length !== 0) {
      cocktail.rates.forEach(rate => {
        if (user._id === rate.user) {
          setRating(rate.rate);
        }
      });
    }
  }, [cocktail, user]);

  let image = noImage;

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
        <Box width="max-content">
          <StarsRating
            value={rating}
            onChange={value => [onRate(value), setRating(value)]}
            allowHalf={false}
          />
          {loading && <LinearProgress color="warning"/>}
        </Box>
      </Grid>
    </Grid>
  );
};

export default FullCocktail;