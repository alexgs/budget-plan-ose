import * as yup from 'yup';
import { TRANSACTION_TYPES } from '../constants';
import { transactionAmount } from './transaction-amount';

export const newTransaction = yup.object({
  amounts: yup.array().of(transactionAmount).required(),
  date: yup.date().required(), // TODO Better client error message for this field
  description: yup.string().required(),
  type: yup.string().oneOf(Object.values(TRANSACTION_TYPES)).required(),
});
