import { combineReducers } from 'redux';

import cafeReducer from './cafeReducer';
import employeeReducer from './employeeReducer';
import spinnerReducer from './spinnerReducer';

const rootReducer = combineReducers({
    cafe: cafeReducer,
    employee: employeeReducer,
    spinner: spinnerReducer
});

export default rootReducer;