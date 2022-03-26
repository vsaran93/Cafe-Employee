import axios from 'axios';
import { FETCH_ALL_CAFES, FETCH_CAFE_BY_ID, FECTH_AVAILABLE_CAFES } from '../utils/types';
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

export const availableCafes = () => {
    return async (dispatch) => {
        axios
            .get(`${API_URL}/cafe/available-cafes`, header)
            .then((res) => {
                dispatch({
                    type: FECTH_AVAILABLE_CAFES,
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

export const createCafe = (cafeData, onSuccess) => {
    return async (dispatch) => {
        axios
            .post(`${API_URL}/cafe`, cafeData, header)
            .then((res) => {
                dispatch(stopLoading());
                onSuccess();
            })
            .catch((e) => {
                console.error('there something wrong creating cafes');
                dispatch(stopLoading());
            });
    }
}

export const updateCafe = (cafeData, cafeId, onSuccess) => {
    return async (dispatch) => {
        axios
            .put(`${API_URL}/cafe/${cafeId}`, cafeData, header)
            .then((res) => {
                dispatch(stopLoading());
                onSuccess();
            })
            .catch((e) => {
                console.error('there something wrong updating cafes');
                dispatch(stopLoading());
            });
    }
}

export const deleteCafe = (cafeId, onSuccess) => {
    return async (dispatch) => {
        axios
            .delete(`${API_URL}/cafe/${cafeId}`, header)
            .then((res) => {
                dispatch(stopLoading());
                onSuccess();
            })
            .catch((e) => {
                console.error('there something wrong deleting cafes');
                dispatch(stopLoading());
            });
    }
}
