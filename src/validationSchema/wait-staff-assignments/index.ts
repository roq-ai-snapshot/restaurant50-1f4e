import * as yup from 'yup';

export const waitStaffAssignmentValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  table_id: yup.string().nullable().required(),
});
