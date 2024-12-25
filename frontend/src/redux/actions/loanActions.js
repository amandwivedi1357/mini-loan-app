import axios from 'axios';
import {
  FETCH_LOANS_REQUEST,
  FETCH_LOANS_SUCCESS,
  FETCH_LOANS_FAILURE,
  CREATE_LOAN_REQUEST,
  CREATE_LOAN_SUCCESS,
  CREATE_LOAN_FAILURE,
  UPDATE_LOAN_STATUS
} from './types';
//onst BASE_URL = 'https://loan-server-three.vercel.app'
//const BASE_URL = 'http://localhost:5000'
const BASE_URL = 'https://mini-loan-app-eight.vercel.app'
export const fetchLoans = () => async (dispatch) => {
  dispatch({ type: FETCH_LOANS_REQUEST });
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const { data } = await axios.get(`${BASE_URL}/api/loans`, config);
    dispatch({ type: FETCH_LOANS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ 
      type: FETCH_LOANS_FAILURE, 
      payload: error.response?.data?.message || 'Failed to fetch loans' 
    });
  }
};

export const createLoan = (loanData) => async (dispatch) => {
  dispatch({ type: CREATE_LOAN_REQUEST });
  try {
    const { data } = await axios.post(`${BASE_URL}/api/loans`, loanData);
    dispatch({ type: CREATE_LOAN_SUCCESS, payload: data });
    return data;
  } catch (error) {
    dispatch({ 
      type: CREATE_LOAN_FAILURE, 
      payload: error.response?.data?.message || 'Failed to create loan' 
    });
    throw error;
  }
};

export const updateLoanStatus = (loanId, status) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.patch(`${BASE_URL}/api/loans/${loanId}/status`, { status }, config);
    dispatch({ type: UPDATE_LOAN_STATUS, payload: data });
    return data;
  } catch (error) {
    throw error;
  }
};