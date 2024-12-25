import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';

//onst BASE_URL = 'https://loan-server-three.vercel.app'
//const BASE_URL = 'http://localhost:5000'
 const BASE_URL = 'https://mini-loan-app-eight.vercel.app'

 export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
    
    localStorage.setItem('token', data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    
    dispatch({ 
      type: LOGIN_SUCCESS, 
      payload: data 
    });
    
    return data; // Optional: return data for more flexibility
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    
    dispatch({ 
      type: LOGIN_FAILURE, 
      payload: errorMessage 
    });
    
    throw error; // Rethrow to allow catching in component
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: LOGOUT });
};