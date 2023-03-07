import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setUser } from './features/auth/authSlice';
import { fetchPosts } from './features/posts/postSlice';
import { fetchComments } from './features/comments/commentsSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
const user = JSON.parse(localStorage.getItem('userProfile'));

store.dispatch(setUser(user));
store.dispatch(fetchPosts());
store.dispatch(fetchComments());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
