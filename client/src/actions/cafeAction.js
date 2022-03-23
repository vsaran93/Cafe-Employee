import axios from 'axios';
import { FETCH_ALL_CAFES, FETCH_CAFE_BY_ID } from '../utils/types';
import { API_URL, header } from '../utils/helper';
import { stopLoading } from './spinnerAction';

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

export const getCafeDetails= (cafeId) => {
    return async (dispatch) => {
        axios
            .get(`${API_URL}/cafe/${cafeId}`, header)
            .then((res) => {
                dispatch({
                    type: FETCH_CAFE_BY_ID,
                    data: res.data.data
                });
            })
            .catch((e) => {
                console.error('there something wrong fetching cafes')
            });
    }
}

export const updateCafe = (cafeData, cafeId) => {
    return async (dispatch) => {
        axios
            .put(`${API_URL}/cafe/${cafeId}`, cafeData, header)
            .then((res) => {
                dispatch(stopLoading());
            })
            .catch((e) => {
                console.error('there something wrong fetching cafes')
            });
    }
}