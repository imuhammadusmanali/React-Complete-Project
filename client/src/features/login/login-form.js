import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../signup/signupSlice';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../auth/authSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../validationSchemas/schemas';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error } = useSelector((state) => ({ ...state.auth }));

  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    error &&
      toast.error(error, {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: 'dark',
      });
  }, [error]);

  const handleSubmit = (values, { setSubmitting }) => {
    const { email, password } = values;

    try {
      dispatch(login({ email, password, toast }));

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
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <Field type="email" placeholder="Email" name="email" />
            <ErrorMessage
              component={'p'}
              name="email"
              className="form-errors"
            />

            <Field type="password" placeholder="Password" name="password" />
            <ErrorMessage
              component={'p'}
              name="password"
              className="form-errors"
            />
            <button className="login-btn" type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>

      <Link className="forgot-pass" to="/">
        Forgot Password?
      </Link>

      <div className="signup-sec">
        <div className="orsection">
          <div className="or-line">
            <hr />
          </div>
          <span>Or</span>
          <div className="or-line">
            <hr />
          </div>
        </div>
        <button
          className="signup-btn"
          onClick={() => {
            dispatch(openModal());
            navigate('/signup');
          }}
        >
          SignUp
        </button>
      </div>
    </>
  );
};
