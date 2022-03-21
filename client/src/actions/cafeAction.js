import axios from 'axios';
import { FETCH_ALL_CAFES } from '../utils/types';
import { API_URL, header } from '../utils/helper';

export const getAllCafes = () => {
    return async (dispatch) => {
        axios
            .get(`${API_URL}/cafes`, header)
            .then((res) => {
                dispatch({
                    type: FETCH_ALL_CAFES,
                    data: res.data.data
                });
            })
            .catch((e) => {
                console.error('there something wrong fetching cafes')
            });
    }
}