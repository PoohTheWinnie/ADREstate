import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';


import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

export const registerHouse = function({strAdd, lat, lng, pictureLink, description}) {
    return async function (dispatch, getState) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({strAdd, lat, lng, pictureLink, description});
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

export const loadHouses = function () {
    return function (dispatch, getState) {
        console.log("Test House Actions!")
        return axios.get('/api/house', tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                dispatch(returnErrors(err.response.data, err.response.status));
            });
    }
}