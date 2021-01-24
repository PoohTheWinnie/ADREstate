import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const registerHouse = function({strAdd, lat, lng, pictureLink, bedrooms, bathrooms, squareFeet, description, userId, name}) {
    return async function (dispatch, getState) {
        const body = JSON.stringify({strAdd, lat, lng, pictureLink, bedrooms, bathrooms, squareFeet, description, userId, name});
        return await axios.post('/api/house', body, tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                console.log("Error Register House Actions");
                console.log(err.response);
                dispatch(returnErrors(err.response.data, err.response.status));
            });
    }
}

export const getHouses = function ({userId, type}) {
    return async function (dispatch, getState) {
        const config = tokenConfig(getState);
        config["params"] = {
            userId: userId,
            type: type
        };
        return await axios.get('/api/house', config)
            .then(res => res.data)
            .catch(function(err) {
                dispatch(returnErrors(err.response.data, err.response.status));
            });
    }
}

export const getHousesInd = function ({userId, type}) {
    return async function (dispatch, getState) {
        const config = tokenConfig(getState);
        config["params"] = {
            type: type
        };
        return axios.get(`/api/house/${userId}`, config)
            .then(res => res.data)
            .catch(function(err) {
                dispatch(returnErrors(err.response.data, err.response.status));
            });
    }
}

export const updateHouse = function(house){
    return function (dispatch, getState) {
        return axios.put(`/api/house/${house.address}`, house, tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                console.log("get err", err); 
                dispatch(returnErrors(err.response.data, err.response.status))
            });
    }
}

export const deleteHouse = function(house){    
    return function (dispatch, getState) {
        return axios.delete(`/api/house/`, { data: { address: house.address }}, tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                console.log("get err", err); 
                dispatch(returnErrors(err.response.data, err.response.status))
            });
    }
}