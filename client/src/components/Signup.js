import { SignupForm } from '../features/signup/signup-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../features/signup/signupSlice';
import { useNavigate } from 'react-router-dom';
import { IoCloseCircleOutline } from 'react-icons/io5';

export const Signup = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  let openSignupModal = useSelector((state) => state.signup);

  if (openSignupModal) {
    return (
      <div className="overlay">
        <div className="signup-container">
          <h3 className="signup-heading">Sign Up Below</h3>

          <span className="icon-cont" title="Close">
            <IoCloseCircleOutline
              className="close-icon"
              onClick={() => {
                dispatch(closeModal());
                navigate('/login');
              }}
            />
          </span>

          <SignupForm />
        </div>
      </div>
    );
  }
};
