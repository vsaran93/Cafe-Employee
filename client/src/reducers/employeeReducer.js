
import { FETCH_ALL_EMPLOYEES } from '../utils/types';
const initialState = {
    employees: [],
};


const employeeReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ALL_EMPLOYEES:
            return {
                ...state,
                employees: action.data
            };
        default:
            return state;
    }
}

export default employeeReducer;


