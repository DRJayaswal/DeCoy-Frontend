import axios from 'axios';

const API_BASE_URL = '/api/v1';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
        return response.data;
    } catch (error) {
        console.error(`Error during registration: ${error}`);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, userData);
        return response.data;
    } catch (error) {
        console.error(`Error during login: ${error}`);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/logout`);
        return response.data;
    } catch (error) {
        console.error(`Error during logout: ${error}`);
        throw error;
    }
};

export const changePassword = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/change-password`, userData);
        return response.data;
    } catch (error) {
        console.error(`Error during password change: ${error}`);
        throw error;
    }
};