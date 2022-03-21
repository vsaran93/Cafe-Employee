
import { FETCH_ALL_CAFES } from '../utils/types';
const initialState = {
    cafes: [],
};


const cafeReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ALL_CAFES:
            return {
                ...state,
                cafes: action.data
            };
        default:
            return state;
    }
}

export default cafeReducer;


