import {
    GET_TRACKS_FAILURE,
    GET_TRACKS_REQUEST, GET_TRACKS_SUCCESS,
    SAVE_TRACKS_FAILURE,
    SAVE_TRACKS_REQUEST,
    SAVE_TRACKS_SUCCESS
} from "../actions/trackHistoryActions";


const initialState = {
    track: [],
    history: [],
    loading: false,
    error: null,
};

const tracksReducer = (state = initialState, actions) => {

    switch (actions.type) {
        case SAVE_TRACKS_REQUEST:
            return {...state, loading: true};
        case SAVE_TRACKS_SUCCESS:
            return {...state, loading: false, track: {...actions.payload}};
        case SAVE_TRACKS_FAILURE:
            return {...state, loading: false, error: actions.payload};

        case GET_TRACKS_REQUEST:
            return {...state, loading: true};
        case GET_TRACKS_SUCCESS:
            return {...state, loading: false, history: {...actions.payload}};
        case GET_TRACKS_FAILURE:
            return {...state, loading: false, error: actions.payload};

        default:
            return state;
    }
};

export default tracksReducer;