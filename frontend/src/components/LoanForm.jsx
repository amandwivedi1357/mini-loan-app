import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createLoan } from '../redux/actions/loanActions';
import { Calculator, DollarSign, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const LoanForm = () => {
  const [amount, setAmount] = useState('');
  const [term, setTerm] = useState('');
  const [weeklyPayment, setWeeklyPayment] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (amount && term) {
      const weekly = parseFloat(amount) / parseInt(term);
      setWeeklyPayment(weekly.toFixed(2));
    }
  }, [amount, term]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createLoan({ amount: parseFloat(amount), term: parseInt(term) }));
      toast.success('Loan application submitted successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit loan application');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-center mb-6">
        <Calculator className="w-8 h-8 text-blue-600" />
        <h2 className="text-2xl font-bold ml-2">Loan Application</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Loan Amount ($)</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              min="1000"
              max="100000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Loan Term (weeks)</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              min="1"
              max="52"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter term"
              required
            />
          </div>
        </div>

        {weeklyPayment > 0 && (
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-blue-800">Weekly Payment Estimate</h3>
            <p className="mt-1 text-lg font-semibold text-blue-900">${weeklyPayment}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default LoanForm;