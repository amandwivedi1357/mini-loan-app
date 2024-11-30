import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const PaymentChart = () => {
  const { loans } = useSelector((state) => state.loan);
  
  const approvedLoans = loans.filter(loan => loan.status === 'APPROVED');
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Payment Schedule</h2>
      <div className="space-y-4">
        {approvedLoans.map(loan => (
          <div key={loan._id} className="border-l-4 border-blue-500 pl-4">
            <p className="font-medium">${loan.amount.toFixed(2)}</p>
            <div className="mt-2 space-y-1">
              {loan.repayments.map((repayment, index) => (
                <div 
                  key={index}
                  className={`h-2 rounded-full ${
                    repayment.status === 'PAID' 
                      ? 'bg-green-500' 
                      : 'bg-gray-200'
                  }`}
                  style={{ width: `${(100 / loan.repayments.length)}%` }}
                  title={`Due: ${format(new Date(repayment.dueDate), 'MMM dd, yyyy')}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentChart;