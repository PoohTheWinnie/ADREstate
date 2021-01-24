import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const registerUser = function (user) {
    return function (dispatch, getState) {
        return axios.post('/api/users', user, tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                dispatch(returnErrors(err.response.data, err.response.status));
            });
    }
};

export const getUser = function (userId) {
    return function (dispatch, getState) {
        return axios.get(`/api/user/${userId}`, tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                dispatch(returnErrors(err.response.data, err.response.status))
            });
    }
};

export const updateUser = function(user){
    return function (dispatch, getState) {
        return axios.put(`/api/user/${user.id}`, user, tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                console.log("get err", err); 
                dispatch(returnErrors(err.response.data, err.response.status))
            });
    }
}