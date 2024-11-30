import {
  FETCH_LOANS_REQUEST,
  FETCH_LOANS_SUCCESS,
  FETCH_LOANS_FAILURE,
} from '../actions/types';

const initialState = {
  loans: [],
  loading: false,
  error: null,
};

const loanReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOANS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_LOANS_SUCCESS:
      return { ...state, loading: false, loans: action.payload };
    case FETCH_LOANS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default loanReducer;