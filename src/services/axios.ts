import axios from 'axios';

axios.interceptors.request.use(
    config => {
        config.headers['Access-Control-Allow-Origin'] = '*';
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
