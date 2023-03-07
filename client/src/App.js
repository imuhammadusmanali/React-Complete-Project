import './App.css';
import { PostList } from './features/posts/PostList';
import { AddPostForm } from './features/posts/AddPostForm';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

import { SinglePost } from './features/posts/SinglePost';
import { EditPostForm } from './features/posts/EditPostForm';

import { Layout } from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserPosts } from './features/posts/UserPosts';
import { Dashboard } from './features/posts/Dashboard';
import { UserDrafts } from './features/posts/UserDrafts';

import { getAuth } from './features/auth/authSlice';

import { useSelector } from 'react-redux';

function App() {
  // const dispatch = useDispatch();
  // const user = JSON.parse(localStorage.getItem('userProfile'));

  // useEffect(() => {
  //   dispatch(setUser(user));
  // });

  const currentUser = useSelector(getAuth);

  return (
    <Routes>
      {!currentUser ? (
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route index element={<PostList />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      ) : (
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route index element={<PostList />} />
          <Route path="posts/:_id" element={<SinglePost />} />

          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<AddPostForm />} />
            <Route path="myposts" element={<UserPosts />} />
            <Route path="myposts/:_id" element={<SinglePost />} />
            <Route path="myposts/edit/:_id" element={<EditPostForm />} />

            <Route path="drafts" element={<UserDrafts />} />
            <Route path="drafts/:_id" element={<SinglePost />} />
            <Route path="drafts/edit/:_id" element={<EditPostForm />} />
          </Route>

          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Route>
      )}
    </Routes>
  );
}

export default App;
