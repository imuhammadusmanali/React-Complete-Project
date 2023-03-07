import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../auth/authSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signUpSchema } from '../validationSchemas/schemas';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => ({ ...state.auth }));

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  useEffect(() => {
    error &&
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: 'dark',
      });
  }, [error]);

  const handleSubmit = (values, { setSubmitting }) => {
    const { name, email, password } = values;

    try {
      dispatch(register({ name, email, password, toast }));

      if (!error) {
        navigate('/');
      }
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      console.error(`Error: ${err}`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="signup-form">
          <Field type="text" placeholder="Full Name" name="name" />
          <ErrorMessage component={'p'} name="name" className="form-errors" />

          <Field type="email" placeholder="email@example.com" name="email" />
          <ErrorMessage component={'p'} name="email" className="form-errors" />

          <Field type="password" placeholder="Password" name="password" />
          <ErrorMessage
            component={'p'}
            name="password"
            className="form-errors"
          />

          <Field
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <ErrorMessage
            component={'p'}
            name="confirmPassword"
            className="form-errors"
          />

          <button className="signup-btn" type="submit" disabled={isSubmitting}>
            Sign Up
          </button>
          <Link className="already-user" to="/login">
            Already have an account?
          </Link>
        </Form>
      )}
    </Formik>
  );
};
