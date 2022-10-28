import {Link} from "react-router-dom";
import {apiUrl} from "../../config";
import noImage from "../../assets/images/noImage.png";
import {makeStyles} from "tss-react/mui";
import {Card, CardActions, CardContent, CardHeader, CardMedia, Chip, Grid, IconButton, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {ArrowForward} from "@mui/icons-material";


const useStyles = makeStyles()({
    card: {
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    }
})



const CocktailItem = ({name, id, image, published}) => {
    const user = useSelector(state => state.users.user);

    const {classes} = useStyles();

    let cardImage = noImage;

    if (image) {
        cardImage = apiUrl + '/' + image;
    }


    return (
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card className={classes.card} sx={{position: 'relative'}}>
                <CardHeader title={name}/>
                <CardMedia
                    image={cardImage}
                    title={name}
                    className={classes.media}
                />
                <CardContent>
                    <Typography variant="subtitle1">
                        {name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/cocktail/' + id}>
                        <ArrowForward/>
                    </IconButton>
                </CardActions>
                {!published && user && (user.role === 'admin')
                  ? <Chip sx={{position: 'absolute', top: 0, right: 0}} label="unpublished" color="primary" />
                  : null
                }
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