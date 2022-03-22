import axios from 'axios';
import { FETCH_ALL_EMPLOYEES } from '../utils/types';
import { API_URL, header } from '../utils/helper';

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