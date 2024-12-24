import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';

const BASE_URL = 'https://loan-server-three.vercel.app'
 //const BASE_URL = 'https://mini-loan-app-navy.vercel.app'

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
    localStorage.setItem('token', data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    console.log(data)
    dispatch({ type: LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
      type: LOGIN_FAILURE, 
      payload: error.response?.data?.message || 'Login failed' 
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: LOGOUT });
};