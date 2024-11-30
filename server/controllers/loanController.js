import Loan from '../models/Loan.js';
import { addWeeks, parseISO } from 'date-fns';

export const createLoan = async (req, res) => {
  try {
    const { amount, term } = req.body;
    const weeklyAmount = amount / term;
    
    const repayments = Array.from({ length: term }, (_, index) => ({
      amount: weeklyAmount,
      dueDate: addWeeks(new Date(), index + 1),
      status: 'PENDING'
    }));

    const loan = await Loan.create({
      userId: req.user._id,
      amount,
      term,
      repayments
    });

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLoans = async (req, res) => {
  try {
    const loans = req.user.role === 'admin' 
      ? await Loan.find().populate('userId', 'name email')
      : await Loan.find({ userId: req.user._id });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLoanStatus = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    loan.status = req.body.status;
    await loan.save();

    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRepayment = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    console.log(loan)
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    if (loan.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const repaymentIndex = loan.repayments.findIndex(r => 
      r.status === 'PENDING'
    );

    if (repaymentIndex === -1) {
      return res.status(400).json({ message: 'All repayments are already paid' });
    }

    loan.repayments[repaymentIndex].status = 'PAID';
    
    // Check if all repayments are paid
    const allPaid = loan.repayments.every(r => r.status === 'PAID');
    if (allPaid) {
      loan.status = 'PAID';
    }

    await loan.save();
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};