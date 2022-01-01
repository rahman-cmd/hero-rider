import axios from 'axios';

const headers = {};

if (localStorage.getItem('idToken')) {
   headers.authorization = `Bearer ${localStorage.getItem('idToken')}`;
}

const baseURL = 'https://hero-rider77.herokuapp.com/'


export const axiosInstance = axios.create({
   baseURL
});

export const axiAuth = axios.create({
   baseURL,
   headers,
});