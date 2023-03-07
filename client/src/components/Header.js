import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../features/signup/signupSlice';
import { useNavigate } from 'react-router-dom';
import { logout, getAuth } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getAuth);

  const signOut = () => {
    dispatch(logout());
    toast.success('Logged Out', {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: 'dark',
    });
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <img src="./images/logo.png" alt="Logo" />
        </div>
        <div className="nav-links">
          {!currentUser ? (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'active-nav-link' : 'nav-link'
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'active-nav-link' : 'nav-link'
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => {
                  dispatch(openModal());
                }}
                className={({ isActive }) =>
                  isActive ? 'active-nav-link' : 'nav-link'
                }
              >
                SignUp
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'active-nav-link' : 'nav-link'
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'active-nav-link' : 'nav-link'
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'active-nav-link' : 'nav-link'
                }
                onClick={() => signOut()}
              >
                Sign Out
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
