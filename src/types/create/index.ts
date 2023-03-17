import * as yup from 'yup';

export const createTodoSchema = yup
  .object({
    title: yup
      .string()
      .required('入力必須項目です。')
      .max(30, '30文字以内で入力してください。'),
    detail: yup.string().optional(),
  })
  .required();

export type CreateTodoSchema = yup.InferType<typeof createTodoSchema>;
