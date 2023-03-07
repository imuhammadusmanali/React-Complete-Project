import { NavLink, Outlet } from 'react-router-dom';
import {
  IoReaderOutline,
  IoCreateOutline,
  IoSaveOutline,
} from 'react-icons/io5';

export const Dashboard = () => {
  return (
    <>
      <div className="container">
        <div className="user-icon-sec">
          <NavLink
            end
            to={`/dashboard`}
            className={({ isActive }) =>
              isActive ? 'active-user-icon' : 'user-icon'
            }
            title="Create"
          >
            <IoCreateOutline />
            <h4>Create</h4>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'active-user-icon' : 'user-icon'
            }
            title="My Posts"
            to={`/dashboard/myposts`}
          >
            <IoReaderOutline />
            <h4>My Posts</h4>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? 'active-user-icon' : 'user-icon'
            }
            title="Drafts"
            to={`/dashboard/drafts`}
          >
            <IoSaveOutline />
            <h4>Drafts</h4>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </>
  );
};
