import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const registerHouse = function({strAdd, lat, lng, pictureLink, description, userId}) {
    return async function (dispatch, getState) {
        const body = JSON.stringify({strAdd, lat, lng, pictureLink, description, userId});
        console.log(body);
        return await axios.post('/api/house', body, tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                console.log("Error Register House Actions");
                console.log(err.response);
                dispatch(returnErrors(err.response.data, err.response.status));
            });
    }
}

export const getHouses = function () {
    return function (dispatch, getState) {
        console.log("Test House Actions!")
        return axios.get('/api/house', tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                dispatch(returnErrors(err.response.data, err.response.status));
            });
    }
}

export const getHousesInd = function (userId) {
    return function (dispatch, getState) {
        return axios.get(`/api/house/${userId}`, tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                dispatch(returnErrors(err.response.data, err.response.status));
            });
    }
}