import axios from 'axios';
import { FETCH_ALL_EMPLOYEES, FETCH_EMPLOYEE_BY_ID } from '../utils/types';
import { API_URL, header } from '../utils/helper';
import { stopLoading } from './spinnerAction';

export const getAllEmployees = () => {
    return async (dispatch) => {
        axios
            .get(`${API_URL}/employees`, header)
            .then((res) => {
                dispatch({
                    type: FETCH_ALL_EMPLOYEES,
                    data: res.data.data
                });
            })
            .catch((e) => {
                console.error('there something wrong fetching employees')
            });
    }
}


export const getEmployeeById = (employeeId) => {
    return async (dispatch) => {
        axios
            .get(`${API_URL}/employee/${employeeId}`, header)
            .then((res) => {
                dispatch({
                    type: FETCH_EMPLOYEE_BY_ID,
                    data: res.data.data
                });
            })
            .catch((e) => {
                console.error('there something wrong fetching a employee')
            });
    }
}

export const updateEmployee = (employeeId, employeeData) => {
    return async (dispatch) => {
        axios
            .put(`${API_URL}/employee/${employeeId}`, employeeData, header)
            .then((res) => {
                dispatch(stopLoading());
            })
            .catch((e) => {
                console.error('there something wrong updating employee')
            });
    }
}