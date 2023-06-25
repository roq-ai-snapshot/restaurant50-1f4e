import * as yup from 'yup';

export const menuValidationSchema = yup.object().shape({
  restaurant_id: yup.string().nullable().required(),
});
