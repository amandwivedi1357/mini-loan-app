import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoans } from '../redux/actions/loanActions';
import axios from 'axios';
import { format } from 'date-fns';
import { DollarSign, Calendar, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:5000'
const LoanDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loans, loading } = useSelector((state) => state.loan);
  const [currentLoan, setCurrentLoan] = useState(null);

  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  useEffect(() => {
    if (loans.length > 0) {
      const loan = loans.find(l => l._id === id);
      setCurrentLoan(loan);
    }
  }, [loans, id]);

  const handleRepayment = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${BASE_URL}/api/loans/${id}/repayment`, {}, config);
      setCurrentLoan(data);
      toast.success('Repayment successful!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to process repayment');
    }
  };

  if (loading || !currentLoan) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Loan Details</h1>
            <p className="text-gray-600">
              Created on {format(new Date(currentLoan.createdAt), 'MMMM dd, yyyy')}
            </p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-semibold
            ${currentLoan.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
              currentLoan.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
              'bg-blue-100 text-blue-800'}`}>
            {currentLoan.status}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <DollarSign className="w-5 h-5" />
              <span>Loan Amount</span>
            </div>
            <p className="text-2xl font-bold">${currentLoan.amount.toFixed(2)}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Calendar className="w-5 h-5" />
              <span>Term Length</span>
            </div>
            <p className="text-2xl font-bold">{currentLoan.term} weeks</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <DollarSign className="w-5 h-5" />
              <span>Weekly Payment</span>
            </div>
            <p className="text-2xl font-bold">
              ${(currentLoan.amount / currentLoan.term).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Repayment Schedule</h2>
          <div className="space-y-4">
            {currentLoan.repayments.map((repayment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">Payment {index + 1}</p>
                  <p className="text-sm text-gray-600">
                    Due: {format(new Date(repayment.dueDate), 'MMMM dd, yyyy')}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">${repayment.amount.toFixed(2)}</span>
                  {repayment.status === 'PAID' ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      Paid
                    </span>
                  ) : (
                    currentLoan.status === 'APPROVED' && (
                      <button
                        onClick={handleRepayment}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Pay Now
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;