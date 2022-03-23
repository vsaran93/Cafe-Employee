
import { SET_LOADING } from '../utils/types';
const initialState = {
    isLoading: false
};


const spinnerReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.data
            };
        default:
            return state;
    }
}

export default spinnerReducer;


