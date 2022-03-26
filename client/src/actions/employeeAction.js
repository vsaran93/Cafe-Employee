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

export const updateEmployee = (employeeId, employeeData, onSuccess) => {
    return async (dispatch) => {
        axios
            .put(`${API_URL}/employee/${employeeId}`, employeeData, header)
            .then((res) => {
                dispatch(stopLoading());
                onSuccess();
            })
            .catch((e) => {
                dispatch(stopLoading());
                console.error('there something wrong updating employee')
            });
    }
}

export const createEmployee = (employeeData, onSuccess) => {
    return async (dispatch) => {
        axios
            .post(`${API_URL}/employee`, employeeData, header)
            .then((res) => {
                dispatch(stopLoading());
                onSuccess();
            })
            .catch((e) => {
                dispatch(stopLoading());
                console.error('there something wrong creating employee')
            });
    }
}

export const deleteEmployee = (employeeId, onSuccess) => {
    return async (dispatch) => {
        axios
            .delete(`${API_URL}/employee/${employeeId}`, header)
            .then((res) => {
                dispatch(stopLoading());
                onSuccess();
            })
            .catch((e) => {
                dispatch(stopLoading());
                console.error('there something wrong deleting employee')
            });
    }
}