import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  status: yup.string().required(),
  table_id: yup.string().nullable().required(),
  customer_id: yup.string().nullable().required(),
});
