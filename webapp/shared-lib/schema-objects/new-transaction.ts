import * as yup from 'yup';

export const newTransaction = yup.object({
  amounts: yup
    .array()
    .required()
    .of(
      yup.object({
        accountId: yup.string().required(),
        amount: yup.number().required(),
        categoryId: yup.string().required(),
        isCredit: yup.boolean().required(),
        notes: yup.string(),
        status: yup
          .string()
          .matches(/^(pending|cleared|reconciled)$/)
          .required(),
      })
    ),
  date: yup.date().required(), // TODO Better client error message for this field
  description: yup.string().required(),
  type: yup
    .string()
    .matches(/^(payment|credit_card|account_transfer)$/)
    .required(),
});
