import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createLoan } from '../redux/actions/loanActions';
import { Calculator, DollarSign, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-center space-x-2">
              <Calculator className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-center">Loan Application</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Loan Amount ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min="1000"
                    max="100000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter amount"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Loan Term (weeks)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    max="52"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter term"
                    required
                  />
                </div>
              </div>

              {weeklyPayment > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-blue-50 p-4 rounded-md shadow-inner"
                >
                  <h3 className="text-sm font-medium text-blue-800">Weekly Payment Estimate</h3>
                  <p className="mt-1 text-2xl font-semibold text-blue-900">${weeklyPayment}</p>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoanForm;

