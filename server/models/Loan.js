import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  term: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'PAID'],
    default: 'PENDING'
  },
  repayments: [{
    amount: Number,
    dueDate: Date,
    status: {
      type: String,
      enum: ['PENDING', 'PAID'],
      default: 'PENDING'
    }
  }]
}, {
  timestamps: true
});

const Loan = mongoose.model('Loan', loanSchema);
export default Loan;