import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import FacebookIcon from '@mui/icons-material/Facebook';
import {Button} from "@mui/material";
import {facebookId} from "../../config";
import {useDispatch} from "react-redux";
import {facebookLogin} from "../../store/actions/usersActions";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const facebookResponse = (response) => {
      console.log(response);
      dispatch(facebookLogin(response));
    }

    return (
        <FacebookLoginButton
            appId={facebookId}
            fields="name, email, picture"
            callback={facebookResponse}
            render={props => (
                <Button
                    fullWidth
                    color='primary'
                    variant='outlined'
                    startIcon={<FacebookIcon/>}
                    onClick={props.onClick}
                >
                    Enter with Facebook
                </Button>
            )}
        />
    );
};

export default FacebookLogin;