import axios from 'axios';
import { logoutUser } from './store/user/userSlice';

const authFetch = axios.create({
    baseURL: '/api/v1' 
});
    
authFetch.interceptors.response.use(
    (response) => {
        return response;
    },
     (err) => {
        if(err.response.status === 401) {
            logoutUser();
        }
        return Promise.reject(err);
    }
);

export default authFetch;