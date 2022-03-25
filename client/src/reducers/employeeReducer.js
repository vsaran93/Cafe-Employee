
import { FETCH_ALL_EMPLOYEES, FETCH_EMPLOYEE_BY_ID } from '../utils/types';
const initialState = {
    employees: [],
    employeeDetails: {}
};


const employeeReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ALL_EMPLOYEES:
            return {
                ...state,
                employees: action.data
            };
        case FETCH_EMPLOYEE_BY_ID:
            return {
                ...state,
                employeeDetails: action.data
            }
        default:
            return state;
    }
}

export default employeeReducer;


