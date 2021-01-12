// var fs = require('fs');
// var path = require('path');
// var multer = require('multer');
 
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// var upload = multer({ storage: storage });

// import axios from 'axios';
// import { tokenConfig } from './authActions';
// import { returnErrors } from './errorActions';

// import {
//     USER_LOADED,
//     USER_LOADING,
//     AUTH_ERROR,
//     LOGIN_SUCCESS,
//     LOGIN_FAIL,
//     LOGOUT_SUCCESS,
//     REGISTER_SUCCESS,
//     REGISTER_FAIL
// } from "./types";

// export const uploadImage = function(image) {
//     return async function (dispatch, getState) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//         return await axios.post('/api/image', image, tokenConfig(getState))
//             .then(res => res.data)
//             .catch(function(err) {
//                 console.log("Error Failed Upload Image");
//                 console.log(err.response);
//                 dispatch(returnErrors(err.response.data, err.response.status));
//             });
//     }
// }

// export const getHouses = function (userId) {
//     return function (dispatch, getState) {
//         console.log("Test Get Houses!")
//         return axios.get('/api/image', tokenConfig(getState))
//             .then(res => res.data)
//             .catch(function(err) {
//                 dispatch(returnErrors(err.response.data, err.response.status));
//             });
//     }
// }
