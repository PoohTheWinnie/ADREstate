import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const uploadImage = function(image) {
    return async function (dispatch, getState) {
        return await axios.post('/api/image', image, tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                console.log("Error Failed Upload Image");
                console.log(err.response);
                dispatch(returnErrors(err.response.data, err.response.status));
            });
    }
}

export const getImage = function (userId) {
    return async function (dispatch, getState) {
        console.log("Test Get Image!")
        console.log(userId);
        return axios.get(`/api/image/${userId}`, tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                dispatch(returnErrors(err.response.data, err.response.status));
            });
    }
}
