import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  createLoan,
  getLoans,
  updateLoanStatus,
  addRepayment
} from '../controllers/loanController.js';

const router = express.Router();

router.route('/')
  .post(protect, createLoan)
  .get(protect, getLoans);

router.route('/:id/status')
  .patch(protect, admin, updateLoanStatus);

router.route('/:id/repayment')
  .post(protect, addRepayment);

export default router;