import { body, validationResult } from 'express-validator';

export const validateLoan = [
  body('amount')
    .isFloat({ min: 1000, max: 100000 })
    .withMessage('Loan amount must be between $1,000 and $100,000'),
  body('term')
    .isInt({ min: 1, max: 52 })
    .withMessage('Loan term must be between 1 and 52 weeks'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateAuth = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];