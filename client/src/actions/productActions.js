import axios from 'axios';

import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// export const getProducts = () => {
//   getAll: async () => {
//     let res = await axios.get(`/api/product`);
//     return res.data || [];
//   }
// }

export const registerProduct = function(product) {
    return async function (dispatch, getState) {
        const body = JSON.stringify(product);
        console.log(body);
        console.log("Checkpoint Register Product");
        return await axios.post('/api/product', body, tokenConfig(getState))
            .then(res => res.data)
            .catch(function(err) {
                console.log("Error Register Product Actions");
                console.log(err.response);
                dispatch(returnErrors(err.response.data, err.response.status));
            });
    }
};