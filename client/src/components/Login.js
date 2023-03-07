import { LoginForm } from '../features/login/login-form';

export const Login = () => {
  return (
    <div className="login-content container">
      <div>
        <img
          className="login-img"
          src="../../images/login-img.png"
          alt="Login Logo"
        />
      </div>
      <div className="login-form-container">
        <h3 className="login-heading">Please Login</h3>
        <LoginForm />
      </div>
    </div>
  );
};
