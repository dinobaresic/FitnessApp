import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Base URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const getUsers = async () => {
    try {
        const response = await api.get('/user'); 
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

export const createUser = async (userData) => {
    try {
        const response = await api.post('/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error.response?.data || error.message);
        return null;
    }
};
