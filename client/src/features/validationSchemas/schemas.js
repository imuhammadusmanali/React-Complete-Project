import * as Yup from 'yup';

export const signUpSchema = Yup.object({
  name: Yup.string().min(3).max(25).required('Please enter your name!'),
  email: Yup.string().email().required('Please enter your email!'),
  password: Yup.string()
    .min(8)
    .max(16)
    .required('Password should be 8 to 16 characters'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords Must Match!'),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required('Please enter your email!'),
  password: Yup.string().min(8).max(16).required('Password is required'),
});

export const postSchema = Yup.object({
  title: Yup.string().min(1).required('Title cannot be empty'),
  content: Yup.string().min(1).required('Please describe yourself...'),
});

export const commentSchema = Yup.object({
  content: Yup.string().min(1).required('Please describe yourself...'),
});
