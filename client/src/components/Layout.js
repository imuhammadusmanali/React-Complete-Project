import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="App">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
