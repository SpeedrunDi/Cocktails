import {
  CREATE_COCKTAIL_FAILURE,
  CREATE_COCKTAIL_REQUEST,
  DELETE_COCKTAIL_FAILURE,
  DELETE_COCKTAIL_REQUEST,
  DELETE_COCKTAIL_SUCCESS,
  FETCH_COCKTAIL_FAILURE,
  FETCH_COCKTAIL_REQUEST,
  FETCH_COCKTAIL_SUCCESS,
  FETCH_COCKTAILS_FAILURE,
  FETCH_COCKTAILS_REQUEST,
  FETCH_COCKTAILS_SUCCESS,
  ON_ACTIVATE_FAILURE,
  ON_ACTIVATE_REQUEST,
  ON_ACTIVATE_SUCCESS, RATE_COCKTAIL_FAILURE, RATE_COCKTAIL_REQUEST, RATE_COCKTAIL_SUCCESS
} from "../actions/cocktailActions";

const initialState = {
  fetchLoading: false,
  cocktails: [],
  cocktail: null,
  createError: null,
  rateLoading: false,
  rateError: null,
  deleteLoading: false,
  deleteError: null
};

const cocktailsReducer = (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case FETCH_COCKTAILS_REQUEST:
      return {...state, fetchLoading: true};
    case FETCH_COCKTAILS_SUCCESS:
      return {...state,  fetchLoading: false, cocktails: payload};
    case FETCH_COCKTAILS_FAILURE:
      return {...state, fetchLoading: false};
    case FETCH_COCKTAIL_REQUEST:
      return {...state, fetchLoading: true};
    case FETCH_COCKTAIL_SUCCESS:
      return {...state,  fetchLoading: false, cocktail: payload};
    case FETCH_COCKTAIL_FAILURE:
      return {...state, fetchLoading: false};
    case CREATE_COCKTAIL_REQUEST:
      return {...state, createError: null};
    case CREATE_COCKTAIL_FAILURE:
      return {...state, createError: payload};
    case ON_ACTIVATE_REQUEST:
      return {...state, fetchLoading: true};
    case ON_ACTIVATE_SUCCESS:
      return {...state, fetchLoading: false};
    case ON_ACTIVATE_FAILURE:
      return {...state, fetchLoading: false};

    case RATE_COCKTAIL_REQUEST:
      return {...state, rateLoading: true, rateError: null};
    case RATE_COCKTAIL_SUCCESS:
      return {...state, rateLoading: false};
    case RATE_COCKTAIL_FAILURE:
      return {...state, rateError: action.payload};

    case DELETE_COCKTAIL_REQUEST:
      return {...state, deleteLoading: true, deleteError: null}
    case DELETE_COCKTAIL_SUCCESS:
      return {...state, deleteLoading: false, deleteError: null}
    case DELETE_COCKTAIL_FAILURE:
      return {...state, deleteLoading: false, deleteError: payload}
    default:
      return state;
  }
};

export default cocktailsReducer;