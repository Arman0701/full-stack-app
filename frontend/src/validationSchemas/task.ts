import * as yup from 'yup';

export const taskSchema = yup.object().shape({
  title: yup
    .string()
    .required('Task title is required')
    .min(3, 'Task title must be at least 3 characters'),
  description: yup
    .string()
    .required('Task title is required')
    .min(3, 'Task title must be at least 3 characters'),
});
