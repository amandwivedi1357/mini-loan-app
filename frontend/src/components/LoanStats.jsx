import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart3, TrendingUp, AlertCircle, CheckCircleIcon } from 'lucide-react';

const LoanStats = () => {
  const { loans } = useSelector((state) => state.loan);

  const stats = {
    totalAmount: loans.reduce((acc, loan) => acc + loan.amount, 0),
    activeLoans: loans.filter(loan => loan.status === 'APPROVED').length,
    pendingLoans: loans.filter(loan => loan.status === 'PENDING').length,
    completedLoans: loans.filter(loan => loan.status === 'PAID').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Loan Amount</p>
            <p className="text-2xl font-bold">${stats.totalAmount.toFixed(2)}</p>
          </div>
          <BarChart3 className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Active Loans</p>
            <p className="text-2xl font-bold">{stats.activeLoans}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Pending Approval</p>
            <p className="text-2xl font-bold">{stats.pendingLoans}</p>
          </div>
          <AlertCircle className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Completed Loans</p>
            <p className="text-2xl font-bold">{stats.completedLoans}</p>
          </div>
          <CheckCircleIcon className="w-8 h-8 text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default LoanStats;