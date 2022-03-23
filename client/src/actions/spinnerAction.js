import { SET_LOADING } from '../utils/types';

export const setLoading = () => {
    return {
        type: SET_LOADING,
        data: true
    }
}

export const stopLoading = () => {
    return {
        type: SET_LOADING,
        data: false
    }
}