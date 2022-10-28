import {toast} from "react-toastify";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";

export const FETCH_COCKTAILS_REQUEST = 'FETCH_COCKTAILS_REQUEST';
export const FETCH_COCKTAILS_SUCCESS = 'FETCH_COCKTAILS_SUCCESS';
export const FETCH_COCKTAILS_FAILURE = 'FETCH_COCKTAILS_FAILURE';

export const CREATE_COCKTAIL_REQUEST = 'CREATE_COCKTAIL_REQUEST';
export const CREATE_COCKTAIL_SUCCESS = 'CREATE_COCKTAIL_SUCCESS';
export const CREATE_COCKTAIL_FAILURE = 'CREATE_COCKTAIL_FAILURE';

export const FETCH_COCKTAIL_REQUEST = 'FETCH_COCKTAIL_REQUEST';
export const FETCH_COCKTAIL_SUCCESS = 'FETCH_COCKTAIL_SUCCESS';
export const FETCH_COCKTAIL_FAILURE = 'FETCH_COCKTAIL_FAILURE';

export const ON_ACTIVATE_REQUEST = 'ON_ACTIVATE_REQUEST';
export const ON_ACTIVATE_SUCCESS = 'ON_ACTIVATE_SUCCESS';
export const ON_ACTIVATE_FAILURE = 'ON_ACTIVATE_FAILURE';

export const RATE_COCKTAIL_REQUEST = 'RATE_COCKTAIL_REQUEST';
export const RATE_COCKTAIL_SUCCESS = 'RATE_COCKTAIL_SUCCESS';
export const RATE_COCKTAIL_FAILURE = 'RATE_COCKTAIL_FAILURE';

export const DELETE_COCKTAIL_REQUEST = 'DELETE_COCKTAIL_REQUEST';
export const DELETE_COCKTAIL_SUCCESS = 'DELETE_COCKTAIL_SUCCESS';
export const DELETE_COCKTAIL_FAILURE = 'DELETE_COCKTAIL_FAILURE';



export const fetchCocktailRequest = () => ({type:FETCH_COCKTAIL_REQUEST});
export const fetchCocktailSuccess = data => ({type:FETCH_COCKTAIL_SUCCESS, payload: data});
export const fetchCocktailFailure = () => ({type:FETCH_COCKTAIL_REQUEST});

export const fetchCocktailsRequest = () => ({type: FETCH_COCKTAILS_REQUEST});
export const fetchCocktailsSuccess = data => ({type: FETCH_COCKTAILS_SUCCESS, payload: data});
export const fetchCocktailsFailure = () => ({type: FETCH_COCKTAILS_FAILURE});

export const createCocktailRequest = () => ({type: CREATE_COCKTAIL_REQUEST});
export const createCocktailSuccess = data => ({type: CREATE_COCKTAIL_SUCCESS, payload: data});
export const createCocktailFailure = error => ({type: CREATE_COCKTAIL_FAILURE, payload: error});

export const onActivateRequest = () => ({type: ON_ACTIVATE_REQUEST});
export const onActivateSuccess = () => ({type: ON_ACTIVATE_SUCCESS});
export const onActivateFailure = () => ({type: ON_ACTIVATE_FAILURE});

export const rateCocktailRequest = () => ({type: RATE_COCKTAIL_REQUEST});
export const rateCocktailSuccess = () => ({type: RATE_COCKTAIL_SUCCESS});
export const rateCocktailFailure = error => ({type: RATE_COCKTAIL_FAILURE, payload: error});


const deleteCocktailRequest = () => ({type: DELETE_COCKTAIL_REQUEST});
const deleteCocktailSuccess = () => ({type: DELETE_COCKTAIL_SUCCESS});
const deleteCocktailFailure = (error) => ({type: DELETE_COCKTAIL_FAILURE, payload: error});



export const fetchCocktail = id => {
  return async dispatch => {
    try {
      dispatch (fetchCocktailRequest());
      const response = await axiosApi.get('/cocktails/' + id);
      dispatch (fetchCocktailSuccess(response.data));
    } catch (e) {
      dispatch(fetchCocktailFailure(e));
    }
  }
};


export const fetchCocktails = (user, route) => {
  return async (dispatch) => {
    let response = null;
    try {
      dispatch (fetchCocktailsRequest());
      response = await axiosApi.get('/cocktails' + route);

      dispatch (fetchCocktailsSuccess(response.data));
    } catch (e) {
      dispatch(fetchCocktailsFailure(e));
    }
  }
};

export const createCocktail = data => {
  return async (dispatch, getState) => {
    try {
      dispatch(createCocktailRequest());
      await axiosApi.post('/cocktails', data,
        {
          headers: {
            'Authorization': getState().users.user && getState().users.user.token,
          },

        });
      dispatch(createCocktailSuccess());
      dispatch(historyPush('/'));
      toast.success('Saves successfully');
    } catch (e) {
      dispatch(createCocktailFailure(e))
    }
  }
};

export const onActivate = (data,id, user) => {
  return async (dispatch) => {
    try {
      dispatch(onActivateRequest());
      await axiosApi.patch('/cocktails/'+id, data);

      dispatch(onActivateSuccess());
      dispatch(fetchCocktails(user, '/'));
    } catch (e) {
      dispatch(onActivateFailure(e))
    }
  }
};

export const rateCocktail = (id, rate) => {
  return async (dispatch) => {
    try {
      dispatch(rateCocktailRequest());
      await axiosApi.patch('/cocktails/rate/'+id, {rate});

      dispatch(rateCocktailSuccess());
    } catch (e) {
      dispatch(rateCocktailFailure(e));
    }
  }
};


export const deleteCocktail = (id, user) => {
  return async (dispatch) => {
    try {
      dispatch(deleteCocktailRequest());
      await axiosApi.delete(`/cocktails/${id}`);
      dispatch(deleteCocktailSuccess());
      dispatch(fetchCocktails(user, ''));
    } catch (e) {
      dispatch(deleteCocktailFailure(e));
    }
  }
};

