import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import FormElement from "../../components/UI/Form/FormElement/FormElement";
import {createCocktail} from "../../store/actions/cocktailActions";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles()(theme => ({
    title: {
        marginBottom: theme.spacing(3)
    },
    gridIng: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3)
    },
    form: {
        width: '500px',
        margin: '0 auto',
        textAlign: 'right',
        marginBottom: '100px',
        backgroundColor: '#e8eaf6',
        padding: '20px',
        borderRadius: '10px'
    },
    ingName: {
        flexGrow: 1,
        marginRight: theme.spacing(2)
    },
    ingLabel: {
        marginRight: theme.spacing(2),
        color: '#000'
    },
    submit: {
        display: "block"
    },
}));


const AddIngredients = () => {
    const {classes} = useStyles();
    const dispatch = useDispatch();
    const [ingredients, setIngredients] = useState([{
        name: '',
        amount: '',
    }]);

    const [cocktail, setCocktail] = useState({
        title: '',
        recipe: '',
        image: '',
    })

    const changeIngredients = (i, name, value) => {
        setIngredients(prevState => {
            const copyIng = {
                ...prevState[i],
                [name]: value,
            }
            return prevState.map((ing, index) => {

                if (i === index) return copyIng;

                return ing
            });
        })
    };

    const eraseIngredients = (index) => {
        setIngredients(ingredients.filter((ing, i) => i !== index));
    };

    const addsIngredients = () => {
        setIngredients(prevState => [
            ...prevState,
            {
                name: '',
                amount: '',
            }
        ]);
    };

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setCocktail(prevState => ({...prevState, [name]: value}));
    };

    const submitFormHandler = e => {
        e.preventDefault();

        cocktail.ingredients = JSON.stringify(ingredients);

        const formData = new FormData();

        Object.keys(cocktail).forEach(key => {
            formData.append(key, cocktail[key]);
        });

        console.log(formData);
        dispatch(createCocktail(formData));
    };

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setCocktail(prevState => {
            return {...prevState, [name]: file};
        });
    };

    return (
        <>
            <Typography
                variant="h5"
                component="h5"
                className={classes.title}
                align="center"
            >
                Create new cocktail
            </Typography>
            <form
                onSubmit={submitFormHandler}
                className={classes.form}
            >
                <FormElement
                    required
                    autoComplete="off"
                    label="Name of cocktail"
                    name="title"
                    value={cocktail.title}
                    onChange={inputChangeHandler}
                />
                <Typography className={classes.ingLabel} textAlign={"center"}>Ingredients:</Typography>
                <Grid >
                    {ingredients.map((ing, i) => (
                        <Grid
                            item
                            key={i}
                            container
                            justifyContent={"center"}
                        >
                            <TextField
                                required
                                autoComplete="off"
                                label="Name"
                                name="name"
                                fullWidth
                                value={ingredients[i].name}
                                onChange={e => changeIngredients(i, 'name', e.target.value)}
                            />
                            <TextField
                                required
                                autoComplete="off"
                                label="Amount"
                                name="amount"
                                value={ingredients[i].amount}
                                sx={{margin: "10px 0"}}
                                onChange={e => changeIngredients(i, 'amount', e.target.value)}
                            />
                            <Button
                                type="button"
                                style={{backgroundColor: "red", color: "white", marginBottom: "10px"}}
                                onClick={() => eraseIngredients(i)}

                            >
                                <DeleteForeverIcon/>
                            </Button>
                        </Grid>
                    ))}
                    <Button
                        type='button'
                        variant="contained"
                        onClick={addsIngredients}
                        fullWidth
                    >
                        <AddIcon/> Add ingredient
                    </Button>
                </Grid>
                <Grid container className={classes.gridInd}>
                    <TextField
                        required
                        label="Recipe"
                        name="recipe"
                        maxRows={5}
                        value={cocktail.recipe}
                        onChange={inputChangeHandler}
                        sx={{margin: "10px 0"}}
                    />
                </Grid>

                <TextField
                    type="file"
                    name="image"
                    onChange={fileChangeHandler}
                    sx={{marginBottom: "10px"}}
                />

                <Button
                    className={classes.submit}
                    type='submit'
                    variant="contained"
                    style={{display: "block", margin: "0 auto"}}
                >
                    Create Cocktail
                </Button>
            </form>
        </>
    );
};


export default AddIngredients;