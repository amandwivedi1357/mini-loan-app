import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLoans } from '../redux/actions/loanActions';
import { PlusCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import LoanStats from '../components/LoanStats';
import PaymentChart from '../components/PaymentChart';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loans, loading } = useSelector((state) => state.loan);
  const { user } = useSelector((state) => state.auth);

  console.log(user)
  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-600';
      case 'APPROVED': return 'text-green-600';
      case 'PAID': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-5 h-5" />;
      case 'APPROVED': return <CheckCircle className="w-5 h-5" />;
      case 'PAID': return <CheckCircle className="w-5 h-5" />;
      default: return <XCircle className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Loans</h1>
        <Link
          to="/loans/new"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5" />
          New Loan
        </Link>
      </div>

      <LoanStats />
      <PaymentChart />

      {loans.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No loans found. Start by applying for a new loan!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loans.map((loan) => (
            <Link
              key={loan._id}
              to={`/loans/${loan._id}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-lg font-semibold">${loan.amount.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(loan.createdAt), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div className={`flex items-center gap-1 ${getStatusColor(loan.status)}`}>
                  {getStatusIcon(loan.status)}
                  <span>{loan.status}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Term</span>
                  <span>{loan.term} weeks</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Weekly Payment</span>
                  <span>${(loan.amount / loan.term).toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

