
import { FETCH_ALL_CAFES, FETCH_CAFE_BY_ID, FECTH_AVAILABLE_CAFES } from '../utils/types';
const initialState = {
    cafes: [],
    cafeDetails: {},
    availableCafesList: []
};


const cafeReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ALL_CAFES:
            return {
                ...state,
                cafes: action.data
            };
        case FETCH_CAFE_BY_ID:
            return {
                ...state,
                cafeDetails: action.data
            }
        case FECTH_AVAILABLE_CAFES:
            return {
                ...state,
                availableCafesList: action.data
            }
        default:
            return state;
    }
}

export default cafeReducer;


