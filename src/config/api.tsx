const isProduction = process.env.REACT_APP_ENVIRONMENT === 'production';

const localApiConfig = {
    baseUrl: 'http://localhost:5000',
};
const prodApiConfig = {
    baseUrl: 'http://localhost:5000',
};
console.log(process.env.REACT_APP_ENVIRONMENT);

let apiConfig = localApiConfig;
if (isProduction) {
    apiConfig = prodApiConfig;
}

export { apiConfig };
