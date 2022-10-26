import {Link} from "react-router-dom";
import {apiUrl} from "../../config";
import noImageFile from '../../assets/images/2048px-No_image_available.svg.png';
import {makeStyles} from "tss-react/mui";
import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import PropTypes from "prop-types";


const useStyles = makeStyles()({
    card: {
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
})

const ArrowForwardIcon = () => {
    return null;
};

const CocktailItem = ({name, recipe, id, image}) => {
    const {classes} = useStyles();

    let cardImage = noImageFile;

    if (image) {
        cardImage = apiUrl + '/uploads/' + image;
    }

    return (
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card className={classes.card}>
                <CardHeader title={name}/>
                <CardMedia
                    image={cardImage}
                    title={name}
                    className={classes.media}
                />
                <CardContent>
                    <Typography variant="subtitle1">
                        {recipe}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/cocktail/' + id}>
                        <ArrowForwardIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

CocktailItem.propTypes = {
    name: PropTypes.string.isRequired,
    recipe: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string
};

export default CocktailItem;